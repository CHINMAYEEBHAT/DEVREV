Intelligent Ticket Tagging System 

Overview
The Intelligent Ticket Tagging System automates the classification and tagging of incoming tickets in a support system. It leverages Gemini AI to identify the context, type, and reasoning behind each ticket, ensuring efficient routing and resolution.

Project Architecture
1 Input Layer
Incoming tickets are fed into the system via APIs.
Ticket data includes content, metadata, and user information.
2 Processing Layer
Gemini AI: Analyzes the ticket content to extract key information.
Classification Model: Categorizes tickets into predefined types (e.g., feature request, bug report).
Part Assignment Engine: Tags the ticket to the appropriate product area.
Reasoning Extractor: Generates a brief explanation for the ticket classification.
3 Output Layer
Generates and stores ticket tags, types, and explanations.
Sends outputs to external systems via APIs.
Allows manual override by support agents.
4 Feedback Loop
Captures manual corrections to improve model performance over time.

Technologies Used
Platform: DevRev Snap-in Platform
Languages: TypeScript
APIs: DevRev APIs for ticket data management
Gemini Tools: Open-source tools for context analysis, enabling complex data interpretation through natural language understanding and machine learning.
Setup Instructions

Prerequisites
Access to DevRev Snap-in platform
API keys for DevRev APIs
TypeScript development environment
Node.js installed on your system

Project Installation
git clone https://github.com/devrev/snap-in-examples/tree/main/6-timer-ticket-creator 
On cloning change the code of the respective files sent in our repository ie https://github.com/CHINMAYEEBHAT/DEVREV/

Install Dependencies:
		npm install
Set up environment variables:
Create a .env file in the project root.
Add your DevRev API credentials and configuration settings:
DEVREV_API_KEY=your_api_key
DEVREV_BASE_URL=https://api.devrev.ai

Running the project:
Start the application:
		npm start
  
Deploy to the DevRev Snap-in platform using their CLI tools:
devrev profiles authenticate --org orgname --usr email
devrev snap_in_package create-one --slug my-first-sn | jq
devrev snap_in_version create-one --path ./devrev-snaps-typescript-template
devrev snap_in draft

Usage Guidelines
Configuring the System
Access the configuration interface provided by the snap-in.
Set tagging thresholds and customize ticket types as per organizational needs.
Processing Tickets
The system automatically processes tickets in real-time upon arrival.
Gemini AI analyzes ticket content to determine:
Product Part: Maps to the relevant product section.
Ticket Type: Classifies as feature request, bug report, or others.
Reasoning: Provides an explanation for the classification.
Manual Overrides
Support agents can view tags and classifications.
Corrections can be made through the interface, feeding into the system's learning model.
Generating Reports
Use the integrated reporting tool to analyze trends and identify improvements in ticket handling.

Best Practices
Accuracy Focus: Train the model on a diverse dataset to ensure high classification accuracy.
Scalability: Design the system to handle large ticket volumes.
Interactive Features: Use DevRev's snap-in commands and snap-kits to enhance usability.

References
DevRev Snap-ins Documentation
DevRev API Documentation
Tickets Documentation
Parts Documentation
