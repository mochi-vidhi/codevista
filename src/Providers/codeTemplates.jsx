// codeTemplates.js
const codeTemplates = {
    "hello-world": {
      cpp: `#include<iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!";\n  return 0;\n}`,
      java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`,
      python: `print("Hello, World!")`,
      javascript: `console.log("Hello, World!");`,
    },
  };
  
  export default codeTemplates;
  