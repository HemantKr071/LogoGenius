const PROMPT = {
    
    DESIGN_IDEA_PROMPT: "Generate 15 unique and creative logo design ideas for a {logoType} logo for the brand: {logoTitle}. The logo should align with the description: {logoDesc} and incorporate key design elements that enhance its visual appeal. Use the following design reference as inspiration: {logoPrompt}. Each idea should present a distinct style, concept, or symbolic representation that best reflects the brand’s identity. Provide the response in the following structured format: Example \n\n\
    [\n\
        { \"title\": \"Futuristic AI Circuit\", \"description\": \"A sleek, minimalistic chip-like structure representing automation, computing power, and AI-driven technology.\" },\n\
        { \"title\": \"Neural Network Symbol\", \"description\": \"A futuristic digital brain with interconnected nodes, representing AI intelligence and machine learning.\" },\n\
        { \"title\": \"Infinity Loop AI\", \"description\": \"A smooth, continuous loop to symbolize the endless learning and adaptability of AI models.\" }\n\
    ]  Give result in JSON format",

    GENERATE_LOGO_PROMPT: "Create a detailed text prompt for generating a {logoType} logo for the brand: {logoTitle}. Ensure the design aligns with the description: {logoDesc} and follows the specified color palette: {logoColor}. Incorporate the provided design concept: {logoPrompt} to maintain a professional and visually striking aesthetic. The design should also be inspired by the idea: {logoIdea} and description of idea {logoIdeaDescription}, ensuring uniqueness and creativity. Give me result in JSON format with prompt field only"
};

export default PROMPT;
