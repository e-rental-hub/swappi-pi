'use client';

import { Header } from "@/components/Header";

export default function TermsOfService() {
  return (
    <>
    <Header title="Terms of Service" />
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <div className="text-sm text-muted-foreground mb-6">
        Last Updated: <span className="font-medium">29 May 2025</span><br />
        Contact Email: <a href="mailto:haycoder24@gmail.com" className="underline">haycoder24@gmail.com</a>
      </div>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
        <p>
          By using the Xchange Pi app, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use the app.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Eligibility and Use</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>You must be a registered Pi Network Pioneer to use Xchange Pi.</li>
          <li>You agree to use the app only for lawful purposes and in accordance with Pi Network guidelines.</li>
          <li>You are responsible for maintaining the confidentiality of your account and for all activities under your account.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Platform Functionality</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>You will be required to fund in app wallet from the Pioneer mainnet wallet balance before sell ads can be created.</li>
          <li>Xchange Pi enables users to create Buy and Sell Orders for Pi Coin and FIAT based on in app wallet balances.</li>
          <li>All trades are peer-to-peer and subject to availability, user agreement and confirmations between trading parties.</li>
          <li>Express swap and order creation features are provided as-is and may be updated or modified at any time.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
        <p>
          All content, features, and functionality of Xchange Pi are owned by the Xchange Pi team and protected by applicable intellectual property laws.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
        <p>
          Xchange Pi is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the app, including but not limited to losses from trades or technical issues.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Xchange Pi, its team, affiliates, and partners from any claims, damages, or expenses arising from your use of the app or violation of these terms.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Governing Law</h2>
        <p>
          These Terms are governed by the laws of England and Nigeria, including any disputes arising from their subject matter or formation.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Changes to Terms</h2>
        <p>
          We may update these Terms of Service at any time. The latest version will be posted in the app or on our website.
        </p>
      </section>
    </div>
    </>
  );
}