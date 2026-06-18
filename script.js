const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");

const routes = {
  home: {
    title: "Likely SCHADS Home Care stream",
    copy:
      "Most NDIS support workers providing personal care, domestic assistance, daily living support, community access, transport from home, or one-to-one support are usually in the SCHADS Home Care stream.",
    list: [
      "Level 2 is the common starting point for direct client-facing support.",
      "Level 1 is generally introductory and should be used cautiously for direct personal care.",
      "Experience helps determine pay point; duties determine classification level."
    ]
  },
  sacs: {
    title: "Test SCHADS Social and Community Services stream",
    copy:
      "SACS becomes more likely where the work is case management, support coordination, program delivery, advocacy, community development, recreation work, welfare work, or service management.",
    list: [
      "Ask whether the worker is delivering a program or coordinating supports rather than providing daily living support.",
      "Manager roles may sit at higher SACS levels depending on responsibility and delegation.",
      "Do not move to SACS just because the work happens in the community."
    ]
  },
  health: {
    title: "Check Health Professionals and Support Services Award",
    copy:
      "Clinical allied health work is not ordinary SCHADS support work. OTs, physios, speech pathologists, psychologists, behaviour support practitioners, and similar roles may need a different award pathway.",
    list: [
      "Ask what qualification and registration the role requires.",
      "Ask whether the work is clinical assessment, therapy, treatment, or report writing.",
      "Refer complex coverage questions for legal or specialist award advice."
    ]
  },
  nurse: {
    title: "Check the Nurses Award",
    copy:
      "Registered Nurses and Enrolled Nurses performing nursing duties are generally tested against the Nurses Award, not SCHADS. The key is whether the person is engaged to perform nursing work.",
    list: [
      "Ask about AHPRA registration.",
      "Ask whether the role includes clinical care, medication administration, care planning, or supervising nursing care.",
      "A support worker with a nursing background may still be SCHADS if they are not engaged to perform nursing duties."
    ]
  },
  contractor: {
    title: "Test employee versus contractor risk",
    copy:
      "ABN, invoices, and insurance matter, but they do not decide the issue alone. If the person is rostered, directed, integrated, and delivering core work under the provider's systems, employee risk rises.",
    list: [
      "Ask who controls when, where, and how the work is done.",
      "Ask whether they work for multiple clients and can subcontract or refuse work.",
      "Refer uncertain contractor, tax, super, payroll tax, or insurance issues to the right adviser."
    ]
  }
};

const answers = {
  support: {
    title: "Support worker classification",
    copy:
      "Most NDIS support workers providing one-to-one personal care, daily living support, domestic assistance, community access, or transport from the participant's home will usually sit under the SCHADS Home Care stream. Level 2 is commonly appropriate where the worker follows care plans, provides direct support, and works under routine or general supervision.",
    coach:
      "Ask for duties, setting, supervision, experience, employment type, and whether any clinical, nursing, support coordination, case management, or supervisory duties are involved."
  },
  contractor: {
    title: "Contractor risk wording",
    copy:
      "A subcontractor arrangement may be possible, but an ABN, insurance, and invoices do not automatically make someone a genuine contractor. If they are rostered like staff, directed by the business, integrated into the team, and providing core ongoing services, the arrangement may carry employment risk.",
    coach:
      "Keep the wording practical and avoid giving legal conclusions. Recommend legal/accounting advice where the business is relying on contractor status."
  },
  nurse: {
    title: "Nurses and allied health",
    copy:
      "If the person is performing nursing duties as an RN or EN, test the Nurses Award. If the person is delivering allied health or clinical services, test the Health Professionals and Support Services Award. If they are only doing support worker duties, their qualification alone does not change the classification.",
    coach:
      "Ask what work they will actually perform, not just what qualification they hold."
  },
  cancellation: {
    title: "Rosters, cancellations, and rates",
    copy:
      "Do not confirm exact rates without the roster, classification, employment type, ordinary hours, penalties, sleepover or active overnight details, broken shift pattern, travel, and allowances. Use Fair Work PACT or the current pay guide.",
    coach:
      "For cancellations, check whether the employee is casual, part-time, or full-time, and whether the award client cancellation rules are triggered."
  },
  outscope: {
    title: "Out-of-scope response",
    copy:
      "This sits a little outside our HR advice scope, so I would recommend confirming this with the relevant specialist. From an HR perspective, we can help with the employment agreement, classification questions, onboarding checklist, and practical employee management process.",
    coach:
      "Name the right referral point: lawyer, accountant, insurance broker, migration agent, Avaana, NDIS Commission, or payroll specialist."
  }
};

const questions = [
  {
    prompt:
      "A client asks whether a worker who only takes participants to appointments and coffee can be classified below Home Care Level 2. What do you say?",
    strong:
      "A strong answer says community access and transport can still be direct one-to-one support with duty of care. Start with SCHADS Home Care, commonly Level 2, unless the full duties justify a different level.",
    keywords: ["community", "transport", "direct", "support", "home care", "level 2"]
  },
  {
    prompt:
      "A client wants to engage all support workers as contractors because they have ABNs and invoices. What risk flags do you raise?",
    strong:
      "A strong answer says ABN and invoices are not enough. Risk increases if workers are rostered, directed, integrated, not running their own business, and doing core ongoing work. Refer legal/accounting advice if the client relies on contractor status.",
    keywords: ["abn", "invoice", "rostered", "directed", "integrated", "legal"]
  },
  {
    prompt:
      "A worker has an overseas nursing qualification but will provide daily living support only. Which award pathway do you test?",
    strong:
      "A strong answer says duties drive classification. If they are not engaged to perform nursing duties, do not treat the qualification alone as Nurses Award coverage. Test SCHADS Home Care based on the actual support worker role.",
    keywords: ["duties", "qualification", "nursing", "schads", "home care", "actual"]
  },
  {
    prompt:
      "A client asks for exact rates for a 24/7 roster with sleepovers, broken shifts, and weekends. What should you ask for first?",
    strong:
      "A strong answer asks for classification, employment type, full roster, ordinary hours, overtime, sleepover versus active overnight, broken shift pattern, travel, weekends, public holidays, and allowances. Use PACT or the current pay guide.",
    keywords: ["classification", "roster", "sleepover", "broken", "allowances", "pact"]
  },
  {
    prompt:
      "A client asks Inject to prepare NDIS participant service agreements. How do you respond?",
    strong:
      "A strong answer says participant service agreements are outside HR scope and should be checked with Avaana or an NDIS lawyer. Inject can help with employment and contractor HR documents instead.",
    keywords: ["outside", "scope", "avaana", "lawyer", "employment", "contractor"]
  }
];

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 64);
}

function setRoute(key) {
  const data = routes[key];
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === key);
  });
  document.querySelector("[data-route-title]").textContent = data.title;
  document.querySelector("[data-route-copy]").textContent = data.copy;
  document.querySelector("[data-route-list]").innerHTML = data.list.map((item) => `<li>${item}</li>`).join("");
}

function setAnswer(key) {
  const data = answers[key];
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.classList.toggle("active", button.dataset.answer === key);
  });
  document.querySelector("[data-answer-title]").textContent = data.title;
  document.querySelector("[data-answer-copy]").textContent = data.copy;
  document.querySelector("[data-answer-coach]").textContent = data.coach;
}

document.querySelectorAll("[data-route]").forEach((button) => {
  button.addEventListener("click", () => setRoute(button.dataset.route));
});

document.querySelectorAll("[data-answer]").forEach((button) => {
  button.addEventListener("click", () => setAnswer(button.dataset.answer));
});

const chatLog = document.querySelector("[data-chat-log]");
const chatForm = document.querySelector("[data-chat-form]");
const chatAnswer = document.querySelector("[data-chat-answer]");
let current = 0;

function addMessage(text, type = "bot") {
  const node = document.createElement("div");
  node.className = `message ${type}`;
  node.textContent = text;
  chatLog.append(node);
  node.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function ask() {
  addMessage(`Question ${current + 1}: ${questions[current].prompt}`);
}

function score(answer, keywords) {
  const lower = answer.toLowerCase();
  return keywords.filter((word) => lower.includes(word)).length;
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = chatAnswer.value.trim();
  if (!answer) return;

  const question = questions[current];
  const result = score(answer, question.keywords);
  addMessage(answer, "user");

  if (result >= 4) {
    addMessage(`Strong answer. ${question.strong}`, "feedback");
  } else if (result >= 2) {
    addMessage(`Partly there. ${question.strong}`, "feedback");
  } else {
    addMessage(`Risky or incomplete. ${question.strong}`, "feedback");
  }
  chatAnswer.value = "";
});

document.querySelector("[data-next]").addEventListener("click", () => {
  current = (current + 1) % questions.length;
  ask();
});

document.querySelector("[data-reset]").addEventListener("click", () => {
  current = 0;
  chatLog.innerHTML = "";
  ask();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
ask();
