'use client';

import { Header } from "@/components/Header";

export default function PrivacyPolicy() {
  return (
    <>
    <Header title="Privacy Policy" />
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <div className="text-sm text-muted-foreground mb-6">
        Last Updated: <span className="font-medium">29 May 2025</span><br />
        Contact Email: <a href="mailto:haycoder24@gmail.com" className="underline">haycoder24@gmail.com</a>
      </div>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <p>
          Welcome to the Xchange Pi app, a peer-to-peer platform for the Pi Ecosystem that enables users (“Pioneers”) to swap FIAT currency (Naira) for Pi Network Coin. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our services.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>User Information:</strong> When you register or use the app, we may collect your username, user ID, and Pi wallet address from Pi Network. We may collect device information (such as device type, operating system, and unique identifiers).
          </li>
          <li>
            <strong>Order and Transaction Information:</strong> When you create or participate in Buy or Sell Orders, we collect order details, transaction amounts, payment methods, and related information.
          </li>
          <li>
            <strong>Usage Data:</strong> We collect analytics and usage data to improve app performance and user experience.
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To provide, operate, and maintain the Xchange Pi app and its features.</li>
          <li>To facilitate express swaps and peer-to-peer trades between Pioneers.</li>
          <li>To communicate with you regarding your account, orders, ads and important updates.</li>
          <li>To analyze usage and improve the app’s security, reliability, and features.</li>
          <li>To comply with legal requirements and protect the integrity of the Pi Ecosystem.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Sharing Your Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>With Counterparties:</strong> Order and contact information may be shared with other users involved in a trade for fulfillment and communication.
          </li>
          <li>
            <strong>With Service Providers:</strong> We may share information with third-party providers for payment processing, analytics, and technical support.
          </li>
          <li>
            <strong>Legal Compliance:</strong> We may disclose information if required by law or to protect the rights and safety of users and the Pi Ecosystem.
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Security</h2>
        <p>
          We use industry-standard security measures to safeguard your data. However, no method of transmission or storage is completely secure.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Choices</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>You may update your account information in the app settings.</li>
          <li>You may delete your Xchange Pi account by deleting your Pi Network account and choosing to remove your Xchange Pi data upon next access.</li>
          <li>You may opt out of non-essential communications.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy as needed. The latest version will always be available in the app or on our website.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>
          For questions or concerns, contact us at <a href="mailto:haycoder24@gmail.com" className="underline">haycoder24@gmail.com</a>.
        </p>
      </section>
    </div>
    </>
    
  );
}