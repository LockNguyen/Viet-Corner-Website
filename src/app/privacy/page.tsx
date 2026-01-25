import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - Vietnamese Evangelical Church of North Carolina",
    description: "Privacy Policy for the Vietnamese Evangelical Church of North Carolina mobile application",
};

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                <p className="text-gray-600 mb-8">Last updated: January 19, 2026</p>

                <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Introduction</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Vietnamese Evangelical Church of North Carolina (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the
                            Vietnamese Evangelical Church mobile application (the &quot;App&quot;). This Privacy Policy explains how we
                            handle information when you use our App.
                        </p>
                    </section>

                    {/* Information Collection */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Our App is designed for content consumption only. <strong>We do not collect, store, or process
                                any personal information from our users.</strong> You are not required to create an account or
                            provide any personal details to use the App.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            The App does not collect:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 ml-4">
                            <li>Names, email addresses, or contact information</li>
                            <li>Location data</li>
                            <li>Payment or financial information</li>
                            <li>User-generated content</li>
                        </ul>
                    </section>

                    {/* Third-Party Services */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Services</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Our App uses the following third-party services to deliver content:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>
                                <strong>Firebase (Google)</strong> — Used to store and deliver church content such as events
                                and announcements. Firebase may collect technical information such as device type, operating
                                system version, and app usage data for service improvement and analytics purposes. For more
                                information, please review{" "}
                                <a
                                    href="https://firebase.google.com/support/privacy"
                                    className="text-orange-600 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Firebase&apos;s Privacy Policy
                                </a>.
                            </li>
                        </ul>
                    </section>

                    {/* Data Storage */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Local Data Storage</h2>
                        <p className="text-gray-700 leading-relaxed">
                            The App may cache images and content locally on your device to improve performance and enable
                            offline viewing. This data is stored only on your device and is not transmitted to us. You can
                            clear this cached data at any time through your device&apos;s settings.
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Children&apos;s Privacy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our App does not knowingly collect personal information from children under 13 years of age.
                            Since our App does not collect any personal information from any users, it is safe for use by
                            individuals of all ages.
                        </p>
                    </section>

                    {/* Data Security */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h2>
                        <p className="text-gray-700 leading-relaxed">
                            While we do not collect personal information, we take reasonable measures to ensure that the
                            content delivered through our App is transmitted securely using industry-standard encryption
                            (HTTPS/TLS).
                        </p>
                    </section>

                    {/* Changes */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to This Privacy Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page
                            with an updated &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically.
                        </p>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions about this Privacy Policy or our practices, please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-900 font-medium">Vietnamese Evangelical Church of North Carolina</p>
                            <p className="text-gray-700">
                                Email:{" "}
                                <a
                                    href="mailto:loc.software.dev@gmail.com"
                                    className="text-orange-600 hover:underline"
                                >
                                    loc.software.dev@gmail.com
                                </a>
                            </p>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-8">
                    © 2026 Vietnamese Evangelical Church of North Carolina. All rights reserved.
                </p>
            </div>
        </main>
    );
}
