import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const PHONE_REGEX = /^(\+?\d{1,4}[\s-]?)?\d{8,12}$/;

// Simple in-memory rate limiter: 5 requests per IP per 10 minutes.
// NOTE: resets on server restart / doesn't share state across serverless
// instances. Good enough as a first line of defense; swap for a proper
// store (Upstash/Redis) if spam becomes a real problem.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const { name, phone, message } = await req.json();

    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 80) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
    }
    if (typeof phone !== 'string' || !PHONE_REGEX.test(phone.trim())) {
      return NextResponse.json({ error: 'Invalid phone' }, { status: 400 });
    }
    if (typeof message === 'string' && message.length > 1000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }

    const to = process.env.CONTACT_EMAIL_TO;
    if (!to) {
      console.error('CONTACT_EMAIL_TO env var is not set — email not sent.');
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM ?? 'ZAC Website <onboarding@resend.dev>',
      to,
      subject: `New inquiry from ${name.trim()}`,
      text: `Name: ${name.trim()}\nPhone: ${phone.trim()}\nMessage: ${message?.trim() ?? ''}`
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
