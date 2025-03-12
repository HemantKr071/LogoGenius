import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API key is not defined");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  
export const AI_DESIGN_IDEA = model.startChat({
    generationConfig,
    history: [
    {
        role: "user",
        parts: [
        {text: "Generate 15 unique and creative logo design ideas for a Lettermark Logo logo for the brand: AI Saas Company. The logo should align with the description: An AI Saas company that provide AI agents services and incorporate key design elements that enhance its visual appeal. Use the following design reference as inspiration: Design a minimalistic lettermark logo featuring the initials of a SaaS company. The letters should be stylized in a futuristic, professional font with a high-tech feel. Consider using a gradient effect or a simple geometric twist to enhance the look.. Each idea should present a distinct style, concept, or symbolic representation that best reflects the brand’s identity. Provide the response in the following structured format: Example \n\n    [\n        { \"title\": \"Futuristic AI Circuit\", \"description\": \"A sleek, minimalistic chip-like structure representing automation, computing power, and AI-driven technology.\" },\n        { \"title\": \"Neural Network Symbol\", \"description\": \"A futuristic digital brain with interconnected nodes, representing AI intelligence and machine learning.\" },\n        { \"title\": \"Infinity Loop AI\", \"description\": \"A smooth, continuous loop to symbolize the endless learning and adaptability of AI models.\" }\n    ]"},
        ],
    },
    {
        role: "model",
        parts: [
        {text: "[\n  {\n    \"title\": \"Abstract A & S Interlock\",\n    \"description\": \"The letters 'A' and 'S' are cleverly interlocked in a way that resembles a neural network connection. Gradient colors transitioning from blue to purple enhance the high-tech feel.\"\n  },\n  {\n    \"title\": \"Geometric AI Core\",\n    \"description\": \"A stylized geometric representation of 'AI' with sharp, angular lines suggesting precision and advanced technology. A central circle signifies a computational core.\"\n  },\n  {\n    \"title\": \"Ascending AI Curve\",\n    \"description\": \"The letters 'AI' form an upward-sloping curve, symbolizing growth, progress, and the ever-improving capabilities of AI. Use a vibrant blue color scheme.\"\n  },\n  {\n    \"title\": \"Cybernetic 'S'\",\n    \"description\": \"The letter 'S' is designed to appear cybernetic, with segmented lines and digital embellishments implying automation and robotic intelligence. Incorporate a subtle glow effect.\"\n  },\n  {\n    \"title\": \"Data Stream A\",\n    \"description\": \"The letter 'A' is formed by streams of flowing data, represented by thin lines of varying thickness. The color scheme utilizes light blue and white to symbolize information and clarity.\"\n  },\n  {\n    \"title\": \"Binary Code Integration\",\n    \"description\": \"The letters 'AI' are integrated with a subtle binary code pattern. This symbolizes the fundamental digital nature of AI and its foundation in computer science. A dark background enhances the visual impact.\"\n  },\n  {\n    \"title\": \"Abstract Neural Pathway\",\n    \"description\": \"A minimalist representation of a neural pathway using interconnected lines and nodes. The design focuses on flow and connection, implying AI's processing capabilities.\"\n  },\n  {\n    \"title\": \"Sliced 'AI'\",\n    \"description\": \"The letters 'AI' appear to be sliced or broken apart, then seamlessly reassembled, symbolizing the complex analysis and processing that AI performs. Use a cool color palette like blues and silvers.\"\n  },\n  {\n    \"title\": \"AI Pixel Grid\",\n    \"description\": \"The letters 'AS' constructed from a pixel grid. Some pixels are more prominent than others, creating a subtle depth and dimensionality, representing the data driven nature of AI SaaS.\"\n  },\n  {\n    \"title\": \"Adaptive AI Shape\",\n    \"description\": \"A dynamic and fluid shape that morphs between the 'A' and 'S', suggesting AI's ability to adapt and learn. Use a gradient that conveys energy and innovation, like orange to yellow.\"\n  },\n  {\n    \"title\": \"Hidden 'AI' in Circuit\",\n    \"description\": \"A circuit board design with components subtly forming the letters 'AI'. This logo provides a technological and understated representation of the brand.\"\n  },\n    {\n    \"title\": \"Quantum AI Symbol\",\n    \"description\": \"An abstract symbol representing quantum computing. The 'AI' letters are subtly incorporated into the design. The design creates the essence of high-speed processing and the future of AI.\"\n  },\n    {\n    \"title\": \"AI Learning Helix\",\n    \"description\": \"A double helix structure with the letters 'AI' subtly embedded within the strands. This symbol conveys growth, learning, and the advanced capabilities of AI SaaS.\"\n  },\n   {\n    \"title\": \"Reflecting A and S\",\n    \"description\": \"The letter 'A' and letter 'S' are reflecting each other. It symbolizes collaboration and working in synergy of the AI agents. This logo would be great with dark colors.\"\n  },\n  {\n    \"title\": \"The Thinking A\",\n    \"description\": \"The logo would feature the letter 'A' in a unique stance with the top slightly bending to resemble the shape of a question. The bottom side is in a futuristic style.\"\n  }\n]"},
        ],
    },
    ],
});

 

 export const AI_GENERATE_LOGO = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Create a detailed text prompt for generating a Combination Mark logo for the brand: Blogit. Ensure the design aligns with the description: AI Saas Application and follows the specified color palette: Oranges & Yellows. Incorporate the provided design concept: Create a combination logo for a SaaS business that includes both a modern icon and a sleek wordmark. The icon should be minimal yet impactful, while the typography should complement the design with a futuristic and professional touch. to maintain a professional and visually striking aesthetic. The design should also be inspired by the idea: Brainstorming Bulb and description of idea Icon: A lightbulb filled with interconnected nodes, symbolizing AI-driven brainstorming and idea generation. Wordmark: 'Blogit' in a playful yet professional font. Color Scheme: Yellow and Light Gray., ensuring uniqueness and creativity. Give me result in JSON format with prompt field only"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"prompt\": \"Combination Mark logo for 'Blogit', an AI SaaS application. Color palette: Oranges & Yellows. Design concept: Modern icon and sleek wordmark combination. Icon inspiration: 'Brainstorming Bulb'. Icon description: A lightbulb filled with interconnected nodes, symbolizing AI-driven brainstorming and idea generation. Minimal and impactful. Color: Orange gradient into Yellow, giving a warm, inviting feel. Wordmark: 'Blogit' in a playful yet professional font, possibly sans-serif with slightly rounded edges to convey approachability and intelligence. Color: Dark orange, ensuring readability. Typography should be futuristic and professional, complementing the icon. The overall aesthetic should be professional and visually striking, conveying innovation and intelligence. Consider using subtle gradients and shadows for depth and visual appeal. The style should be clean and modern.\"\n}\n```\n"},
      ],
    },
  ],
});


