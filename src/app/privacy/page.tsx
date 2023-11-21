"use client";

import { motion } from 'framer-motion';
import Navbar from '../components/navBar';
import React, { ReactNode, useRef } from 'react';

const Privacy = () => {
    const [isMobileView, setIsMobileView] = React.useState<boolean>(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
    const navBarRef = useRef<HTMLElement | null>(null);
    const [contentMaxHeight, setContentMaxHeight] = React.useState<number | undefined>(undefined);

    React.useEffect(() => {
        const updateHeight = () => {
            if (navBarRef.current) {
                const navBarHeight = navBarRef.current.offsetHeight;
                const viewportHeight = window.innerHeight;
                
                // Set the content max height to be viewport minus the navbar height.
                // Adjust as needed for additional spacing or other elements.
                setContentMaxHeight((viewportHeight - navBarHeight) * 0.8);
            }
        }
    
        // Initial calculation
        updateHeight();
    
        // Add a resize listener
        window.addEventListener('resize', updateHeight);
    
        // Cleanup the listener on component unmount
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    return (
        <>
            <Navbar isMobileView={isMobileView} setIsMobileView={setIsMobileView} ref={navBarRef} />
            <main
                className="pt-32 sub-content flex flex-col min-h-screen relative bg-gradient-dark-blue"
            >
                <div className="flex-1 flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <h1 
                        style={{ fontSize: '36px', fontFamily: 'Exo, sans-serif', whiteSpace: 'nowrap', color: '#FFFFFF', marginTop: '50px' }} 
                        className="text-4xl font-bold z-10 mb-4"
                    >
                        Privacy Policy
                    </h1>

                    <div 
                        className="scrollable-content overflow-auto px-4 sm:px-16 md:px-80 lg:px-80 xl:px-80 2xl:px-80"
                        style={{ maxHeight: `${contentMaxHeight}px` }}
                    >
                            <H2>Introduction</H2>
                            <Pg>This privacy policy (“Privacy Policy”) covers all visitors and users of the Neatwork desktop application and websites (together referred to as the “App” or “Apps”). These are provided by Neatwork.Ai OÜ and its affiliated entities (“Neatwork”, “we”, or “us”). This policy explains how we handle your personal data in association with these Apps, and the manner in which we gather data via cookies and similar technologies. Furthermore, it guides you on accessing and modifying your personal data and outlines the data protection rights that might be applicable under the regulations of your country or state. We urge you to review this Privacy Policy thoroughly. By engaging with any section of the App, you confirm that you are aware of and agree to our procedures concerning your personal data and information.</Pg>
                            <Pg>Similar to the majority website administrators, Neatwork gathers i) technical data about your device, including its internet protocol (IP) address; and (ii) details about your interactions with our Apps, such as the originating URL, the content you viewed, and the elements you engaged with. We obtain some of this information through the use of cookies and analogous technologies. Further details on these technologies can be found below. We compile this data to gain insights into how users engage with our Apps, to enhance the experience for our users, and to ensure the security of our Apps.</Pg>
                            <H2>Personal information</H2>
                            <Pg>When you engage with our Apps, you may decide to share personal information with us. For certain interactions, a User ID is created to monitor forms, URL tracking, page views, activity signals, and usage metrics to gauge product performance and enhancements. The volume and variety of information Neatwork collects is contingent upon how you interact with us and the extent of details you decide to disclose. For instance, when visitors participate in our community Discord or our forum, we request them to submit a username and email address. Moreover, any information you share during account creation on the App will be collected. In every scenario, Neatwork only gathers personal data to the extent deemed necessary or relevant to serve the intention of your interaction or your query to Neatwork. Your personal data will not be revealed except as stated in this Privacy Policy.</Pg>
                            <Pg>For analytical and statistical objectives, we might consolidate all data (including your personal details) sourced from our Apps and might disclose this consolidated data to third parties for promotional activities, such as releasing a report highlighting trends in our Apps&apos; utilization.</Pg>
                            <H2>Data not collected by Neatwork</H2>
                            <Pg>Neatwork purposefully refrains from collecting sensitive or unique category personal data, including but not limited to genetic records, biometric details intended for uniquely identifying an individual, health-related data, or information on religious beliefs.</Pg>
                            <Pg>Neatwork does not deliberately gather data from, nor target any of our App or its content towards children below 18 years of age. Should we discover or have grounds to believe that a user is below 18, we will promptly deactivate that account.</Pg>
                            <H2>Lawful basis and purposes for processing your personal information</H2>
                            <H4>To Execute a Contract or Undertake Measures Pertaining to a Contract with You</H4>
                            <Pg>We utilize your personal data to:</Pg>
                            <Pg>
                                <ul>
                                    <li>- manage and facilitate access to your accounts;</li>
                                    <li>- oversee our client relationships;</li>
                                    <li>- process transactions, deliver our products and services, and dispatch related service notifications;</li>
                                    <li>- offer customer assistance.</li>
                                </ul>
                            </Pg>
                            <H4>Legitimate interests</H4>
                            <Pg>We utilize your personal data:</Pg>
                            <Pg>
                                <ul>
                                    <li>- to enhance and customize your experience with us and our Apps and adjust our communications to your preferences;</li>
                                    <li>- to comprehend how our Apps are used and to innovate new products, services, features, and tools;</li>
                                    <li>- to track and augment the performance of our offerings, as well as for management, security, and fraud detection;</li>
                                    <li>- for in-house operations, management and company reporting, and for internal research and data analysis;</li>
                                    <li>- to ensure adherence to our terms and conditions and other guidelines, or in relation to legal matters, regulatory compliance, investigations, and as mandated (this includes revealing such data in line with legal demands or court proceedings); and</li>
                                </ul>
                            </Pg>
                            <H4>Consent</H4>
                            <Pg>We might hinge on your explicit consent:</Pg>
                            <Pg>    
                                <ul>
                                    <li>- in instances where you have clearly communicated your approval for processing your personal data (for instance, when you agree to get marketing communications from our side);</li>
                                    <li>- when we gain your consent for setting cookies or similar tools; and</li>
                                    <li>- on varied occasions where your consent is sought, for the specific reason clarified at that juncture.</li>
                                </ul>
                            </Pg>
                            <Pg>You possess the right to retract your consent at any given time by using the opt-out option included in the pertinent marketing email or by reaching out to us at <a href="mailto:admin@neatwork.ai">admin@neatwork.ai</a>.</Pg>
                            <H2>How Neatwork Manages and Safeguards Your Personal Data</H2>
                            <H3>Distributing Your Data</H3>
                            <Pg>Neatwork might share your personal details with the third parties outlined below for reasons delineated in this Privacy Policy or upon obtaining your consent.</Pg>
                            <Pg>Neatwork divulges your personal data only to its staff, contractors, and associated entities that (i) require access to the information to act on Neatwork&apos;s behalf or to deliver services available through the App, and (ii) have committed to not sharing it with third parties.</Pg>
                            <H4>Service Providers and Associates.</H4>
                            <Pg>Neatwork collaborates with select service providers and partners to oversee or bolster specific facets of our business functions. For example, at present, we work with the following providers who will manage your personal data:</Pg>
                            <Pg>
                                <ul>
                                    <li>- Google Cloud - for cloud-based data storage</li>
                                    <li>- Sentry - for application observation and error detection</li>
                                    <li>- MixPanel - for analytical insights</li>
                                    <li>- HotJar - for heatmaps</li>
                                </ul>
                            </Pg>
                            <Pg>Our service providers and partners are contractually obligated to uphold the confidentiality of any personal data they receive from us and are restricted from utilizing this data for any reason other than executing services under Neatwork&apos; guidance.</Pg>
                            <H4>Legal Requirements</H4>
                            <Pg>We might share personal data with legal authorities or other third parties if mandated by the law or based on our genuine belief that such an action is essential to: (a) adhere to a legal summons, court directive, or similar legal process, (b) uphold and safeguard our rights or assets, (c) act promptly in situations that may compromise the safety of App users or the general public, (d) guard against any legal liabilities, (e) delve into or counter fraudulent or other illicit activities, or (f) adhere to or be exempt from the law.</Pg>
                            <Pg>Neatwork employs all reasonably essential actions to ensure your personal details are shielded from unauthorized intrusion, utilization, modification, or deletion.</Pg>
                            <H2>International transfer of personal information</H2>
                            <Pg>The Apps are hosted in the European Union and the personal information we collect will be stored and processed on our servers in the European Union. Our employees, contractors and affiliated organizations that process information for us as described above may be located in the European Union, United States or in other countries outside of your home country which may have different data protection standards to those which apply in your home country.</Pg>
                            <Pg>Where your personal information is transferred outside of the EEA, Switzerland and UK and where this is to a country which is not subject to an adequacy decision by the EU Commission or considered adequate as determined by applicable data protection laws, we will take steps to ensure your personal information is adequately protected by safeguards such as Standard Contractual Clauses (“SCCs”) approved by the EU Commission or by the UK Government.</Pg>
                            <H2>Neatwork communications with you</H2>
                            <Pg>Should you be a registered user of the Apps and have provided your email address, Neatwork might periodically send you emails to inform you about security updates, system notifications, new features, request your insights, or simply keep you abreast of happenings at Neatwork and our range of products. For your convenience, every marketing email from us contains an unsubscribe link at its bottom, allowing you to opt out from receiving such communications whenever you wish.</Pg>
                            <Pg>When you reach out to us with a query (possibly through a support email or one of our feedback channels), we might choose to share your query publicly to enhance our response or aid other users. Rest assured, your personal details will not be disclosed when we publish your query.</Pg>
                            <H2>Cookies, tracking technologies and Do Not Track</H2>
                            <H3>Cookies</H3>
                            <Pg>A cookie is a piece of data that a website saves onto a user&apos;s computer, which is then sent back to that website by the user&apos;s browser during subsequent visits. Neatwork employs cookies to recognize and trace visitors, understand their interaction with the Apps, and remember their preferences within the App. Those visiting Neatwork who prefer not to receive cookies can adjust their browser settings to decline them before accessing the Apps. However, turning off cookies might impede certain functionalities of the Neatwork Apps from operating as intended.</Pg>
                            <Pg>Specific pages on the App might activate cookies from third parties. For instance, we might integrate content, like videos, from another platform which deploys its own cookie. Such external platforms determine their own cookie policies, and Neatwork neither has access to nor the ability to regulate these cookies. The application of cookies by external parties isn&apos;t addressed within our Privacy Policy.</Pg>
                            <H2>Global Privacy Standards and User Rights</H2>
                            <Pg>While the information we gather might be stored and processed in the European Union as per this Privacy Policy, we recognize that users from various regions might have unique privacy expectations and entitlements. For every App user, irrespective of their geographic location, we pledge to:</Pg>
                            <Pg>
                                <ul>
                                    <li>- Offer clear mechanisms for explicit and informed consent when collecting your personal data and, where mandated by relevant laws;</li>
                                    <li>- Collect only the essential personal data required for the specified purpose unless you opt to share more with us;</li>
                                    <li>- Provide straightforward methods for you to access, rectify, or delete any personal data we&apos;ve collected, except for data you&apos;ve willingly given which might need to remain unchanged for the integrity of our project code, as detailed further;</li>
                                    <li>- Ensure that App users are given proper notice, choice, accountability, security, and access to their data. We define our processing purposes and provide avenues for recourse and redress.</li>
                                </ul>
                            </Pg>
                            <Pg>You might also be entitled to additional rights under certain circumstances:</Pg>
                            <Pg>
                            <ul>
                                <li>- Data portability rights (when our processing is contingent on consent or a contract and is automated);</li>
                                <li>- Right to retract consent anytime (if the processing hinges on consent). Any processing that has already occurred before consent withdrawal remains unaffected;</li>
                                <li>- Right to challenge processing (if it&apos;s predicated on legitimate interests);</li>
                                <li>- Right to oppose the processing of personal data for direct marketing;</li>
                                <li>- Right to request the deletion of your personal data from our systems (“right to be forgotten”) under specific conditions.</li>
                            </ul>
                            </Pg>
                            <Pg>Certain constraints might apply to these rights. For instance, honoring your request might inadvertently disclose another individual&apos;s personal data or if you request the deletion of data, which either the law mandates us to retain or is in our justifiable vested interest.</Pg>
                            <Pg>When we gather personal data for account management, contract administration, or legal compliance, it&apos;s obligatory. Without this data, we won&apos;t be able to maintain our relationship with you effectively. For other situations, while sharing the requested personal data is discretionary, not doing so might restrict your participation in certain App features or impede your access and utility of specific services where the data is crucial.</Pg>
                            <Pg>To enact your privacy rights, reach out to us via the email <a href="mailto:admin@neatwork.ai">admin@neatwork.ai</a>..</Pg>
                            <H2>Data retention and deletion</H2>
                            <Pg>For users with an account on the Apps, you can view, modify, or delete your basic user profile details by logging into your account and adjusting the profile settings.</Pg>
                            <Pg>Neatwork will maintain your data as long as your account remains active or as necessary to fulfill our contractual responsibilities, deliver services via the App, adhere to legal commitments, resolve conflicts, uphold legal rights, or implement our agreements. The duration of data retention is determined by considering the nature of the data and its intended purpose, ensuring compliance with relevant conditions and the prompt disposal of obsolete or superfluous data whenever feasible. For example, for data used for customer management and potential client interactions, we evaluate the time needed to cultivate and sustain our business relationships and the recency of our engagements with you. We reserve the right to correct, update, or delete any incomplete or inaccurate data, anytime, based on our judgment.</Pg>
                            <H2>Contacting Neatwork About Your Privacy</H2>
                            <Pg>The relevant data controller for any personal information processed in connection with our Apps is Neatwork.Ai OÜ.</Pg>
                            <Pg>Should you have inquiries about this Privacy Policy, or wish to learn more about our privacy and security measures, or if you want to raise a concern regarding our adherence to privacy regulations, kindly reach out to us at <a href="mailto:admin@neatwork.ai">admin@neatwork.ai</a>.</Pg>
                            <Pg>If you have specific issues or queries about the way your personal information is managed or if you&apos;d like to exercise your privacy rights, please send us an email with the subject &quot;Privacy Inquiry&quot; to <a href="mailto:admin@neatwork.ai">admin@neatwork.ai</a>.</Pg>
                            <H2>Privacy policy changes</H2>
                            <Pg>Neatwork may change its privacy policy from time to time, and in Neatwork&apos;s sole discretion.</Pg>
                            <Pg>Additionally, for users who have supplied their email addresses, we may notify them of significant updates to this Privacy Policy through our Website. Neatwork recommends users to periodically review this page to stay informed about any adjustments to the Privacy Policy. Your sustained usage of this site following any modifications in the Privacy Policy signifies your agreement to such changes.</Pg>
                    </div>
                </motion.div>
                </div>
            </main>
        </>
    );
}

interface Props {
  children: ReactNode;
}

const Pg: React.FC<Props> = ({ children }) => {
  return (
    <p 
        style={{ fontFamily: 'Exo, sans-serif', color: '#FFFFFF', marginBottom: '20px' }} 
        className="color"
    >
        {children}
    </p>
  );
};

const H2: React.FC<Props> = ({ children }) => {
  return (
    <h2 
        style={{ fontSize: '26px', fontFamily: 'Exo, sans-serif', color: '#FFFFFF', marginBottom: '20px' }} 
        className="color text-center"
    >
        {children}
    </h2>
  );
};

const H3: React.FC<Props> = ({ children }) => {
    return (
      <h3 
          style={{ fontSize: '24px', fontFamily: 'Exo, sans-serif', color: '#FFFFFF', marginBottom: '20px', fontWeight: 'bold' }} 
          className="color text-center"
      >
          {children}
      </h3>
    );
  };

const H4: React.FC<Props> = ({ children }) => {
    return (
      <h4 
          style={{ fontSize: '18px', fontFamily: 'Exo, sans-serif', color: '#FFFFFF', marginBottom: '20px', fontWeight: 'bold' }} 
          className="color"
      >
          {children}
      </h4>
    );
};

export default Privacy;