# As I come up with new ideas for SwC , I'll write them here.

- *SwiftClass Notes*: Add notes for your classes, not like Google Docs level of quality, but just pointers and stuff. "How to write a SMART goal", "Make sure to do this when studying! You'll regret it otherwise."

- Fun idea: *Warnings and Risk Levels*: Based on the number of close to due or LATE assignments, the level of warning increases in SwC. 1-3. The UI could change to highlight your agenda because STUFF IS LATE.

- *Responsive Grade Tracking*: Based on your target grade values and possibly weighting systems, assignments in your agenda can gain priority. (if you have a 70 in a class and an assignment is due, it would gain max priority)

- *SwiftClass Resources*: An optional tab that can be shown or not shown in settings. It would have resources that are commonly used in classes, like the periodic table and other things.

# Thank you GitHub Copilot for generating the following dummy script:
`
localStorage.setItem('swcClasses', JSON.stringify([
  {
    "name": "Algebra II",
    "teacher": "Ms. Johnson",
    "color": "#4F46E5",
    "link": "https://example.com/algebra"
  },
  {
    "name": "World History",
    "teacher": "Mr. Lee",
    "color": "#F59E0B",
    "link": "https://example.com/history"
  },
  {
    "name": "Biology",
    "teacher": "Dr. Patel",
    "color": "#10B981",
    "link": "https://example.com/biology"
  },
  {
    "name": "English Lit",
    "teacher": "Mrs. Garcia",
    "color": "#EF4444",
    "link": "https://example.com/english"
  },
  {
    "name": "Computer Science",
    "teacher": "Mr. Nguyen",
    "color": "#8B5CF6",
    "link": "https://example.com/cs"
  },
  {
    "name": "Spanish",
    "teacher": "Sra. Lopez",
    "color": "#F97316",
    "link": "https://example.com/spanish"
  },
  {
  "name": "Art",
  "teacher": "Mrs. Smith",
  "color": "#EC4899",
  "link": "https://example.com/art"
  },
  {}
]));
`

# big local storage block
`
  { name: "Google Classroom", link: "https://classroom.google.com" },
  { name: "Canvas", link: "https://canvas.instructure.com" },
  { name: "Khan Academy", link: "https://www.khanacademy.org" },
  { name: "Desmos", link: "https://www.desmos.com" },
  { name: "Quizlet", link: "https://quizlet.com" },
  { name: "StudyStack", link: "https://www.studystack.com" },
  { name: "CK-12", link: "https://www.ck12.org" },
  { name: "Newsela", link: "https://newsela.com" },
  { name: "Britannica", link: "https://www.britannica.com" },
  { name: "Wolfram Alpha", link: "https://www.wolframalpha.com" },
  { name: "LibreTexts", link: "https://libretexts.org" },
  { name: "NASA", link: "https://www.nasa.gov" },
  { name: "NASA Image Library", link: "https://images.nasa.gov" },
  { name: "YouTube Education", link: "https://www.youtube.com/education" },
  { name: "TED-Ed", link: "https://ed.ted.com" },
  { name: "Crash Course", link: "https://www.youtube.com/@crashcourse" },
  { name: "National Geographic", link: "https://www.nationalgeographic.com" },
  { name: "Smithsonian", link: "https://www.si.edu" },
  { name: "PBS LearningMedia", link: "https://www.pbslearningmedia.org" },
  { name: "OpenStax", link: "https://openstax.org" },
  { name: "Project Gutenberg", link: "https://www.gutenberg.org" },
  { name: "A+ Math", link: "https://www.aplusmath.com" },
  { name: "Math is Fun", link: "https://www.mathsisfun.com" },
  { name: "Purplemath", link: "https://www.purplemath.com" },
  { name: "SparkNotes", link: "https://www.sparknotes.com" },
  { name: "Socratic", link: "https://socratic.org" },
  { name: "Brainly", link: "https://brainly.com" },
  { name: "Google Scholar", link: "https://scholar.google.com" },
  { name: "JSTOR", link: "https://www.jstor.org" },
  { name: "Google Translate", link: "https://translate.google.com" },
  { name: "Dictionary.com", link: "https://www.dictionary.com" },
  { name: "Merriam-Webster", link: "https://www.merriam-webster.com" },
  { name: "The School Run", link: "https://www.theschoolrun.com" },
  { name: "World Atlas", link: "https://www.worldatlas.com" },
  { name: "NASA Climate", link: "https://climate.nasa.gov" },
  { name: "PhET", link: "https://phet.colorado.edu" },
  { name: "National Library of Medicine", link: "https://www.nlm.nih.gov" },
  { name: "Coursera", link: "https://www.coursera.org" },
  { name: "edX", link: "https://www.edx.org" },
  { name: "MIT OpenCourseWare", link: "https://ocw.mit.edu" },
  { name: "Codecademy", link: "https://www.codecademy.com" },
  { name: "Kodable", link: "https://www.kodable.com" },
  { name: "Code.org", link: "https://code.org" },
  { name: "Typing.com", link: "https://www.typing.com" }
`