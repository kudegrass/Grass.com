// Define a class to represent a course
class Course {
  constructor(id, title, emoji, intro, learnIntro, topics, summary, outro, buttons) {
    this.id = id;
    this.title = title;
    this.emoji = emoji;
    this.intro = intro;
    this.learnIntro = learnIntro;
    this.topics = topics;
    this.summary = summary;
    this.outro = outro;
    this.buttons = buttons;
  }

  render() {
    const topicsList = this.topics.map(item => `<li>${item}</li>`).join("");
    const buttonsHTML = this.buttons
      .map(btn => `<a href="#" class="topic-btn" data-page="${btn.link}">${btn.label}</a>`)
      .join("");

    return `
      <div class="content-page crop-page">
        <h1 class="home-title crop-title">${this.emoji} ${this.title}</h1>
        <p class="crop-intro">${this.intro}</p>
        <p class="crop-intro">${this.learnIntro}</p>
        <ul class="crop-topics-list">${topicsList}</ul>
        <p class="crop-summary">${this.summary}</p>
        <p class="crop-summary">${this.outro}</p>
        <div class="topic-buttons">${buttonsHTML}</div>
      </div>
    `;
  }
}

// All course data
const courseData = {
  "agri-economics": new Course(
    "agri-economics",
    "Agricultural Economics",
    "📊",
    "Welcome to Agricultural Economics! This section helps you understand how economics influences farming operations and decision-making.",
    "In this section, you'll learn about:",
    [
      "📈 Farm management strategies and cost analysis",
      "📦 Marketing of agricultural products",
      "📜 Government policies and their impacts"
    ],
    "From pricing to policies, this section prepares you to analyze and improve farm profitability and sustainability.",
    "Economize your agri-knowledge—one principle at a time!",
    [
      { label: "📈 Farm Management", link: "./Courses/farm-management.html" },
      { label: "📦 Marketing", link: "./Courses/marketing.html" },
      { label: "📜 Policies", link: "./Courses/policies.html" }
    ]
  ),

  "agri-engineering": new Course(
    "agri-engineering",
    "Agricultural Engineering",
    "🛠️",
    "Welcome to the Agricultural Engineering section! This area introduces you to the technologies and equipment that improve agricultural productivity and sustainability.",
    "In this section, you'll learn about:",
    [
      "🚜 Farm machinery and its operation",
      "💧 Irrigation systems and water management",
      "🏗️ Farm structures for storage and housing"
    ],
    "Get ready to explore how engineering transforms farming. This guide will help you understand the backbone of agricultural infrastructure.",
    "Let’s build your agri-tech knowledge—one machine at a time!",
    [
      { label: "🚜 Machinery", link: "./Courses/machinery.html" },
      { label: "💧 Irrigation", link: "./Courses/irrigation.html" },
      { label: "🏗️ Structures", link: "./Courses/structures.html" }
    ]
  ),

  "agri-extension": new Course(
    "agri-extension",
    "Agricultural Extension",
    "📣",
    "Welcome to the Agricultural Extension section! Learn how to effectively communicate agricultural knowledge and empower communities.",
    "In this section, you'll learn about:",
    [
      "🗣️ Communication techniques in agriculture",
      "🏘️ Strategies for rural and community development"
    ],
    "This section equips you with tools to bridge science and practice, helping you deliver meaningful support to farming communities.",
    "Empower and educate—one message at a time!",
    [
      { label: "🗣️ Communication", link: "./Courses/communication.html" },
      { label: "🏘️ Community Development", link: "./Courses/community-development.html" }
    ]
  ),

  "agri-laws": new Course(
    "agri-laws",
    "Agricultural Laws & Ethics",
    "⚖️",
    "Welcome to Agricultural Laws and Ethics! This section focuses on the legal frameworks and moral principles that guide agricultural practice.",
    "In this section, you'll learn about:",
    [
      "📚 The regulatory environment affecting agriculture",
      "🤝 Ethical considerations and responsibilities of professionals"
    ],
    "This guide helps you understand how laws and ethics shape responsible and fair agricultural development.",
    "Learn the rules—one right at a time!",
    [
      { label: "📚 Regulatory Environment", link: "./Courses/regulatory-environment.html" },
      { label: "🤝 Professional Ethics", link: "./Courses/professional-ethics.html" }
    ]
  ),

  "agri-statistics": new Course(
    "agri-statistics",
    "Agricultural Statistics",
    "📐",
    "Welcome to the Agricultural Statistics section! Understanding and interpreting data is vital for research and informed decisions in agriculture.",
    "In this section, you'll learn about:",
    [
      "📉 Data collection, analysis, and interpretation",
      "🔬 Research design and statistical methods"
    ],
    "This section will strengthen your analytical thinking and help you apply data effectively in real-world agricultural scenarios.",
    "Crunch the numbers—one method at a time!",
    [
      { label: "📉 Data Analysis", link: "./Courses/data-analysis.html" },
      { label: "🔬 Research Methods", link: "./Courses/research-methods.html" }
    ]
  ),

  "animal-science": new Course(
    "animal-science",
    "Animal Science and Husbandry",
    "🐄",
    "Welcome to the Animal Science and Husbandry section of your reviewer! This section is essential for understanding livestock management, focusing on proper nutrition, breeding practices, and animal health to ensure sustainable production.",
    "In this section, you'll learn about:",
    [
      "🍽️ Livestock Nutrition and feeding strategies",
      "🧬 Effective breeding systems and genetic improvement",
      "💉 Health care, disease prevention, and animal welfare"
    ],
    "Whether you're preparing for an exam or enhancing your practical skills, this section will equip you with vital knowledge for successful animal husbandry.",
    "Master livestock care—one topic at a time!",
    [
      { label: "🍽️ Livestock Nutrition", link: "./Courses/livestock-nutrition.html" },
      { label: "🧬 Breeding", link: "./Courses/breeding.html" },
      { label: "💉 Health", link: "./Courses/health.html" }
    ]
  ),

  "crop-production": new Course(
    "crop-production",
    "Crop Production and Management",
    "🌾",
    "Welcome to the Crop Production and Management section of your reviewer! This topic is essential for understanding how crops are grown, managed, and harvested to ensure food security and sustainable agriculture.",
    "In this section, you'll learn about:",
    [
      "🌱 Different types of crops and their growing seasons",
      "🚜 Basic agricultural practices like soil preparation, sowing, irrigation, and harvesting",
      "🔧 Modern methods and tools used in crop management",
      "🛡️ Storage and protection of crops from pests and diseases"
    ],
    "Whether you're preparing for an exam or simply brushing up on your knowledge, this guide will help you grasp the key concepts quickly and effectively.",
    "Let’s grow your knowledge—one topic at a time!",
    [
      { label: "🌿 Plant Physiology", link: "./Courses/plant-physiology.html" },
      { label: "🐛 Pest Control", link: "./Courses/pest-control.html" },
      { label: "📦 Post-Harvest", link: "./Courses/post-harvest.html" }
    ]
  ),

  "soil-science": new Course(
    "soil-science",
    "Soil Science and Fertility",
    "🌱",
    "Welcome to the Soil Science and Fertility section of your reviewer! This topic is crucial for understanding the foundation of all plant growth—soil. Knowing how soil works helps you make better decisions about crop health and productivity.",
    "In this section, you'll explore:",
    [
      "🧪 Soil Classification and the different types and textures of soil",
      "💧 Nutrient Management techniques for optimizing plant growth and yield"
    ],
    "By understanding soil properties and how to maintain its fertility, you'll gain essential knowledge that supports all areas of agriculture.",
    "Let’s dig deeper into the science beneath our feet!",
    [
      { label: "🌍 Soil Classification", link: "./Courses/soil-classification.html" },
      { label: "🌾 Nutrient Management", link: "./Courses/nutrient-management.html" }
    ]
  )
};

// On course selection, update the content
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("course-select");
  const content = document.getElementById("course-content");

  select.addEventListener("change", () => {
    const courseId = select.value;
    const course = courseData[courseId];

    if (course) {
      content.innerHTML = course.render();
    } else {
      content.innerHTML = `<p>Please select a course from the dropdown above.</p>`;
    }
  });
});
