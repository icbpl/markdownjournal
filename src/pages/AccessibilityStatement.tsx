
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const AccessibilityStatement = () => {
  return (
    <>
      <Helmet>
        <title>Accessibility Statement | ScholarHub</title>
        <meta name="description" content="ScholarHub's Accessibility Statement. Learn about our commitment to accessibility." />
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto py-8 px-4"
      >
        <h1 className="text-3xl font-serif font-bold text-academic-700 mb-6">Accessibility Statement</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Our Commitment</h2>
          <p>
            ScholarHub is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards.
          </p>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Conformance Status</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
          </p>
          <p>
            ScholarHub is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
          </p>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Accessibility Features</h2>
          <p>ScholarHub includes the following accessibility features:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Semantic HTML: We use proper HTML elements to ensure a logical document structure</li>
            <li>Text alternatives: We provide text alternatives for non-text content</li>
            <li>Keyboard accessibility: All functionality is available from a keyboard</li>
            <li>Color contrast: We maintain sufficient color contrast ratios</li>
            <li>Resizable text: Text can be resized without loss of content or functionality</li>
            <li>ARIA attributes: We use ARIA landmarks and attributes to enhance accessibility</li>
          </ul>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Compatibility with Browsers and Assistive Technology</h2>
          <p>
            ScholarHub is designed to be compatible with the following assistive technologies:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Screen readers (including NVDA, JAWS, and VoiceOver)</li>
            <li>Screen magnifiers</li>
            <li>Speech recognition software</li>
            <li>Keyboard-only navigation</li>
          </ul>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Limitations and Alternatives</h2>
          <p>
            Despite our best efforts to ensure accessibility of ScholarHub, there may be some limitations. Below is a description of known limitations, and potential solutions. Please contact us if you observe an issue not listed below.
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li><strong>PDFs and other documents:</strong> Some of our older PDF documents may not be fully accessible. We are working to remediate these documents or provide alternative formats upon request.</li>
            <li><strong>Third-party content:</strong> Sometimes we link to or embed third-party content that we do not control. This content may not be fully accessible.</li>
          </ol>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Feedback</h2>
          <p>
            We welcome your feedback on the accessibility of ScholarHub. Please let us know if you encounter barriers on our site, or if you have suggestions for improvement:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Email: accessibility@scholarhub.example.com</li>
            <li>Phone: (555) 123-4567</li>
          </ul>
          <p>
            We strive to respond to feedback within 3 business days.
          </p>
          
          <h2 className="text-2xl font-medium text-academic-600 mt-8 mb-4">Assessment Approach</h2>
          <p>
            ScholarHub assessed the accessibility of this website by the following approaches:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Self-evaluation</li>
            <li>Automated testing using accessibility evaluation tools</li>
            <li>Manual testing with screen readers and keyboard navigation</li>
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default AccessibilityStatement;
