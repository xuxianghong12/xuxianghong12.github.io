let currentSortLink = null;


const projectOrder = [
  "ai4db", 
  "plm", 
  "recommendation", 
  "IR",
];

const projec2title = {
  "ai4db": "Artificial Intelligence for Data Systems",
  "plm": "Pre-trained Language Models",
  "recommendation": "Recommender Systems",
  "IR": "Information Retrieval",
};

const projectDescriptions = {
  "ai4db": "Exploring how to integrate AI models (e.g., Pre-trained Language Models, Large Language Models, Learning-To-Rank) into SQL hint recommendation, number of distict values (NDV) estimation, cardinality estimation, and index recommendation, aiming to reduce SQL execution latency.",
  "plm": "Tuning pre-trained language models (PLMs) for stronger language processing capabilities.",
  "recommendation": "The research focuses on session-based recommendation, to predict the next item based on a sequence of user interactions.",
  "IR": "Investigating how to diversify search results by graph-based methods.",
};


function sortPapers(criteria) {
  const list = document.getElementById('paperList');
  const items = Array.from(list.getElementsByClassName('paper'));

  list.innerHTML = '';

  if (criteria === 'year') {
    items.sort((a, b) => {
      const yearA = parseInt(a.getAttribute('data-year'));
      const yearB = parseInt(b.getAttribute('data-year'));
      if (yearA !== yearB) return yearB - yearA;
      return a.getAttribute('data-author').localeCompare(b.getAttribute('data-author'));
    });
    items.forEach(item => list.appendChild(item));

  } else if (criteria === 'author') {
    items.sort((a, b) => {
      const authorA = parseFloat(a.getAttribute('data-author'));
      const authorB = parseFloat(b.getAttribute('data-author'));
      if (authorA !== authorB) return authorA - authorB;
      return parseInt(b.getAttribute('data-year')) - parseInt(a.getAttribute('data-year'));
    });
    items.forEach(item => list.appendChild(item));

  } else if (criteria === 'project') {
    const projectGroups = {};

    items.forEach(item => {
      const projectName = item.dataset.project; 
      if (!projectGroups[projectName]) {
        projectGroups[projectName] = [];
      }
      projectGroups[projectName].push(item);
    });

    projectOrder.forEach(projectName => {
      // 只处理存在论文的项目
      if (projectGroups[projectName]) {
        // 按年份降序排序项目内的论文
        projectGroups[projectName].sort((a, b) => {
          const yearA = parseInt(a.getAttribute('data-year'));
          const yearB = parseInt(b.getAttribute('data-year'));
          return yearB - yearA;
        });

        // 创建并添加项目标题
        const projectTitle = document.createElement('h2');
        projectTitle.className = 'project-title';
        projectTitle.textContent = projec2title[projectName] || projectName; 
        list.appendChild(projectTitle);

        // 创建并添加项目描述
        const projectDesc = document.createElement('p');
        projectDesc.className = 'project-desc';
        projectDesc.textContent = projectDescriptions[projectName];
        list.appendChild(projectDesc);

        // 创建并添加项目论文列表
        const projectList = document.createElement('ol');
        projectGroups[projectName].forEach(paper => {
          projectList.appendChild(paper);
        });
        list.appendChild(projectList);
      }
    });
  }


  if (currentSortLink) {
    currentSortLink.classList.remove('active');
  }
  currentSortLink = document.querySelector(`.sort-link[onclick="sortPapers('${criteria}')"]`);
  currentSortLink.classList.add('active');
}

sortPapers('year');