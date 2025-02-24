import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const page = () => {
  return (
    <div className="bg-gray-900">
      <Navbar />
      <main className="container mx-auto py-12 px-4 md:px-8 lg:px-12 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-200 mb-6">
            About AI Cheat Sheet Generator
          </h1>

          <div className="bg-indigo-900/30  rounded-lg shadow-md p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our mission is to democratize knowledge and make complex topics
              accessible to everyone. We believe that learning should be easy,
              efficient, and enjoyable. We aim to provide high-quality, concise,
              and easily digestible cheat sheets on a wide range of subjects,
              powered by the latest advancements in artificial intelligence.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              We are committed to helping students, professionals, and lifelong
              learners quickly grasp key concepts, review essential information,
              and improve their understanding of various subjects.
            </p>
          </div>

          <div className="bg-indigo-900/30  rounded-lg shadow-md p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">
              How it Works
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our AI-powered engine analyzes vast amounts of information from
              reputable sources, including textbooks, research papers, and
              expert articles. Using natural language processing (NLP) and
              machine learning algorithms, it identifies the most important
              concepts, definitions, and formulas related to a given topic.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              The AI then synthesizes this information into a concise and
              well-organized cheat sheet, highlighting key takeaways and
              providing clear explanations. We continuously refine our
              algorithms and update our knowledge base to ensure the accuracy
              and relevance of our cheat sheets.
            </p>
          </div>

          <div className="bg-indigo-900/30  rounded-lg shadow-md p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Our Team
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We are a team of passionate educators, engineers, and designers
              dedicated to building innovative tools for learning. We are
              committed to providing a valuable resource for anyone seeking to
              improve their knowledge and skills.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              We believe in the power of AI to transform education and are
              excited to be at the forefront of this revolution.
            </p>
          </div>

          <div className="bg-indigo-900/30 rounded-lg shadow-md p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We'd love to hear from you! If you have any questions,
              suggestions, or feedback, please don't hesitate to contact us.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Email:{" "}
              <a
                href="mailto:sanketpathare8808@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 underline decoration-white "
              >
                sanketpathare8808@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default page;
