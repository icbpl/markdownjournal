
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | ScholarHub</title>
        <meta name="description" content="ScholarHub's Privacy Policy. Learn how we handle your data and protect your privacy." />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto py-8 px-4"
      >
        <h1 className="text-3xl font-serif font-bold text-academic-700 mb-6">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Introduction</h2>
          <p>
            ScholarHub ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by ScholarHub.
          </p>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Information We Collect</h2>
          <p>We collect information that you provide directly to us, such as when you create or modify your account, request customer support, or otherwise communicate with us.</p>
          
          <h3 className="text-xl font-medium text-academic-600 mt-6 mb-3">Personal Information</h3>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Contact information (such as name, email address, and academic affiliation)</li>
            <li>Login credentials</li>
            <li>Search queries and browsing activity on our platform</li>
            <li>Information about how you use our website</li>
          </ul>
          
          <h3 className="text-xl font-medium text-academic-600 mt-6 mb-3">Cookies and Similar Technologies</h3>
          <p>
            We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process and complete transactions, and send related information</li>
            <li>Send technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Develop new products and services</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
          </ul>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Sharing of Information</h2>
          <p>We may share the information we collect in various ways, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
            <li>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law, regulation, or legal process</li>
            <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of ScholarHub or others</li>
          </ul>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Data Retention</h2>
          <p>
            We retain personal information we collect from you where we have an ongoing legitimate business need to do so (for example, to provide you with a service you have requested or to comply with applicable legal requirements).
          </p>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Your Rights</h2>
          <p>
            You have the right to access, update, or delete the information we have on you. Whenever made possible, you can access, update, or request deletion of your personal information directly within your account settings section.
          </p>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> privacy@scholarhub.example.com
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default PrivacyPolicy;
