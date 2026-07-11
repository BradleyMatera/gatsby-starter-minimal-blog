# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: features.spec.ts >> Recruiter isolation >> style lab overrides are cleared on /recruiter/ and restored on return
- Location: e2e\features.spec.ts:94:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.waitForFunction: Test timeout of 60000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e4]:
    - img
    - link "Skip to content" [ref=e6] [cursor=pointer]:
      - /url: "#site-main"
    - navigation "Main Navigation" [ref=e7]:
      - generic [ref=e8]:
        - link "Home" [ref=e9] [cursor=pointer]:
          - /url: /
          - generic [ref=e10]: BM
        - list [ref=e11]:
          - listitem [ref=e12]:
            - link "About Brad" [ref=e13] [cursor=pointer]:
              - /url: /
              - img [ref=e15]
              - generic [ref=e18]: About Brad
          - listitem [ref=e19]:
            - link "For Recruiter" [ref=e20] [cursor=pointer]:
              - /url: /recruiter/
              - img [ref=e22]
              - generic [ref=e25]: For Recruiter
          - listitem [ref=e26]:
            - button "Open Web Designer Lab" [ref=e27] [cursor=pointer]:
              - img [ref=e29]
              - generic [ref=e35]: For Web Designers
        - link "Contact" [ref=e37] [cursor=pointer]:
          - /url: /contact
          - img [ref=e39]
          - generic [ref=e42]: Contact
    - main [ref=e43]:
      - generic [ref=e44]:
        - heading "Bradley Matera — Portfolio" [level=1] [ref=e45]
        - generic [ref=e46]:
          - region "Hero banner" [ref=e48]:
            - generic [ref=e49]:
              - paragraph [ref=e50]: Bradley Matera · Systems software
              - heading "Reliable, measurable software" [level=1] [ref=e51]
              - paragraph [ref=e52]: I build accessible front-end experiences paired with dependable back-end systems and clear automation.
              - link "Collaborate" [ref=e53] [cursor=pointer]:
                - /url: /contact/
                - generic [ref=e54]: Collaborate
                - img [ref=e55]
            - img "Bradley Matera working with AWS systems" [ref=e58]
            - img [ref=e60]
          - generic [ref=e64]:
            - generic [ref=e65]:
              - generic [ref=e66]:
                - generic [ref=e67]: Portfolio built in public with verified demos
                - heading "Bradley Matera - Accessible web developer" [level=2] [ref=e68]
                - paragraph [ref=e69]: Systems-minded web developer building reliable cloud, automation, and software experiences.
                - paragraph [ref=e70]: I ship measurable front-end interfaces, dependable APIs, and automation so projects move faster without guessing how the system behaves.
                - paragraph [ref=e71]: Army medic and operations experience taught me to stay calm under pressure, document every decision, and treat every sprint like a documented checklist so someone else can pick it up without losing momentum.
              - link "Start a project via email bradmatera@gmail.com" [ref=e73] [cursor=pointer]:
                - /url: /contact/
                - generic [ref=e74]: Start a project via email
                - generic [ref=e75]: bradmatera@gmail.com
              - generic "Quick stats" [ref=e76]:
                - generic [ref=e77]:
                  - generic [ref=e78]: AWS
                  - generic [ref=e79]: Cloud Support Engineer Intern · Amazon
                - generic [ref=e80]:
                  - generic [ref=e81]: B.S.
                  - generic [ref=e82]: Web Development · Full Sail · GPA 3.8
                - generic [ref=e83]:
                  - generic [ref=e84]: Focus
                  - generic [ref=e85]: Cloud, DevOps, APIs, AI workflows
            - generic [ref=e86]:
              - generic [ref=e87]:
                - generic [ref=e88]: "01"
                - heading "Cloud reps (labs + public demos)" [level=3] [ref=e89]
                - paragraph [ref=e90]: Practice IAM, logging, staged environments, and cost-aware design in labs and public deployments that stay stable and affordable.
              - generic [ref=e91]:
                - generic [ref=e92]: "02"
                - heading "Secure backend services" [level=3] [ref=e93]
                - paragraph [ref=e94]: Build Node.js APIs with authentication, instrumentation, and documentation so the next developer can extend them without surprises.
              - generic [ref=e95]:
                - generic [ref=e96]: "03"
                - heading "Automation-first workflows" [level=3] [ref=e97]
                - paragraph [ref=e98]: Wire CI/CD, branch protections, and AI helpers into delivery pipelines so the right code reaches a repeatable deploy every time.
          - figure [ref=e99]
          - generic [ref=e101]:
            - heading "Quick snapshot" [level=2] [ref=e104]
            - generic [ref=e106]:
              - generic [ref=e107]:
                - heading "Building visible, reliable work" [level=2] [ref=e108]
                - paragraph [ref=e109]: "I work best with mentorship and clear feedback loops while I build accessible React interfaces backed by observable APIs, monitoring, and automation. The goal: ship features people can rely on and document under pressure."
                - paragraph [ref=e110]:
                  - paragraph [ref=e111]:
                    - text: Looking for a
                    - link "web developer in Durand, Davis, or nearby Northwest Illinois" [ref=e112] [cursor=pointer]:
                      - /url: /web-developer-durand-davis-illinois/
                    - text: "? This site now has a dedicated page that explains the kind of local work I can support and the proof behind it."
              - list [ref=e114]:
                - listitem [ref=e115]:
                  - generic [ref=e120]: Background
                  - generic [ref=e121]: Army combat medic, 82nd Airborne, trained to stay calm, document every step, and keep systems steady under stress.
                - listitem [ref=e122]:
                  - generic [ref=e126]: Current focus
                  - generic [ref=e127]: Pairing UI craft with AWS/Express tooling, shipping responsive hero sections, automation scripts, and documented troubleshooting steps.
                - listitem [ref=e128]:
                  - generic [ref=e135]: Recent wins
                  - generic [ref=e136]: Shipped multiple public demos with clear proof links, tightened accessibility and documentation across projects, and added test-backed examples where it makes sense.
                - listitem [ref=e137]:
                  - generic [ref=e142]: Next step
                  - generic [ref=e143]: Seeking a mentorship-focused environment that values clear communication and measurable progress.
          - figure [ref=e144]
          - generic [ref=e146]:
            - generic [ref=e147]:
              - generic [ref=e148]: Current focus
              - heading "Delivery, automation, and clarity" [level=2] [ref=e149]
            - generic [ref=e150]:
              - paragraph [ref=e152]: "I keep the work measurable: shipping UI components, tying them to APIs, and automating manual ops so future maintainers can move faster."
              - generic [ref=e153]:
                - generic [ref=e154]:
                  - generic [ref=e155]: UI
                  - heading "Front-end leadership" [level=3] [ref=e156]
                  - paragraph [ref=e158]: I deliver responsive dashboards, feature cards, and accessible navigation by pairing Theme UI tokens with custom CSS. Every component ships with focused copy and keyboard support.
                - generic [ref=e159]:
                  - generic [ref=e160]: Ops
                  - heading "Automation & reliability" [level=3] [ref=e161]
                  - paragraph [ref=e163]: I maintain Express proxies, GitHub Actions, and Render-hosted APIs with monitoring, retries, and documentation so simple projects behave like services.
                - generic [ref=e164]:
                  - generic [ref=e165]: Communication
                  - heading "Transparent storytelling" [level=3] [ref=e166]
                  - paragraph [ref=e168]: Every case study includes challenges, solutions, and results. I log what shipped, what still needs polish, and how I would scale it for broader use.
          - figure [ref=e169]
          - generic [ref=e171]:
            - heading "Featured work" [level=2] [ref=e174]
            - generic [ref=e176]:
              - generic [ref=e177]:
                - heading "Case studies that highlight the full stack" [level=2] [ref=e178]
                - generic [ref=e179]:
                  - link "Browse detailed case studies" [ref=e180] [cursor=pointer]:
                    - /url: /projects/
                    - paragraph [ref=e181]: Browse detailed case studies
                  - link "Review open-source contributions" [ref=e182] [cursor=pointer]:
                    - /url: /contributions/
                    - paragraph [ref=e183]: Review open-source contributions
                - paragraph [ref=e185]: These write-ups summarize the problems I solved, the technologies I chose, and the measurable results I delivered.
              - generic [ref=e187]:
                - article [ref=e188]:
                  - generic [ref=e190]:
                    - heading "Car-Match" [level=3] [ref=e191]
                    - paragraph [ref=e192]: Full-stack matchmaking experience
                    - paragraph [ref=e193]:
                      - strong [ref=e194]: "Impact:"
                      - text: Helps a simulated 200+ requests/day scenario stay under 400ms with Render autoscaling, while the chat and forum modules keep user context and permissions consistent.
                    - generic [ref=e195]: "Problem: recruiters and hiring teams need a concise profile and chat flow for prospective hires. Role: product owner and engineer for UI, chat, and API. Approach: React front end, Express API, MongoDB, and Render or Netlify deployment with logging built in. Results: Real-time chat, community forum, and profile matching, all tied to automated tests that cover registration, search, and moderation routes."
                    - generic [ref=e196]:
                      - generic [ref=e197]: React
                      - generic [ref=e198]: Express
                      - generic [ref=e199]: MongoDB
                      - generic [ref=e200]: Render
                      - generic [ref=e201]: Netlify
                    - generic [ref=e202]:
                      - link "GitHub →" [ref=e203] [cursor=pointer]:
                        - /url: https://github.com/BradleyMatera/car-match
                        - text: GitHub
                        - img [ref=e204]
                        - text: →
                      - link "Case study" [ref=e208] [cursor=pointer]:
                        - /url: /projects/car-match/
                - article [ref=e209]:
                  - generic [ref=e211]:
                    - heading "Interactive Pokédex" [level=3] [ref=e212]
                    - paragraph [ref=e213]: API-driven interface
                    - paragraph [ref=e214]:
                      - strong [ref=e215]: "Impact:"
                      - text: Serves as a reference for responsive filtering interfaces and reusable data hooks, with Lighthouse scores above 90 on mobile.
                    - generic [ref=e216]: "Problem: demonstrate accessible search/filter design. Role: front-end architect. Approach: consume the public Pokémon REST API, build keyboard-friendly filtering, and maintain responsive layouts with custom hooks for debounce/cache. Results: fast search (requests debounced at 300ms), keyboard navigation across cards, and skeleton states that keep users oriented."
                    - generic [ref=e217]:
                      - generic [ref=e218]: React
                      - generic [ref=e219]: PokeAPI
                      - generic [ref=e220]: Custom hooks
                      - generic [ref=e221]: Tailwind
                    - generic [ref=e222]:
                      - link "GitHub →" [ref=e223] [cursor=pointer]:
                        - /url: https://github.com/BradleyMatera/Pokedex
                        - text: GitHub
                        - img [ref=e224]
                        - text: →
                      - link "Live demo →" [ref=e228] [cursor=pointer]:
                        - /url: https://bradleymatera.github.io/Interactive-Pokedex/
                        - text: Live demo
                        - img [ref=e229]
                        - text: →
                      - link "Case study" [ref=e233] [cursor=pointer]:
                        - /url: /projects/interactive-pokedex/
                - article [ref=e234]:
                  - generic [ref=e236]:
                    - heading "CIRIS AI contributions" [level=3] [ref=e237]
                    - paragraph [ref=e238]: Open-source collaboration
                    - paragraph [ref=e239]:
                      - strong [ref=e240]: "Impact:"
                      - text: Maintains project momentum by making the stack easier to run locally and documenting how to verify tokens in deployed demos.
                    - generic [ref=e241]: "Problem: improve documentation, add missing health checks, and experiment with Docker deployments for the ethics engine. Role: contributor and reviewer. Approach: submitted PRs that clarified authentication notes, added logging for token validation, and documented Docker Compose for local testing. Results: maintainers merged documentation fixes and test templates; the community now has clearer onboarding for Docker and JWT flows."
                    - generic [ref=e242]:
                      - generic [ref=e243]: Node.js
                      - generic [ref=e244]: Express
                      - generic [ref=e245]: MongoDB
                      - generic [ref=e246]: Docker
                      - generic [ref=e247]: JWT
                    - generic [ref=e248]:
                      - link "Organization →" [ref=e249] [cursor=pointer]:
                        - /url: https://github.com/CIRISAI
                        - text: Organization
                        - img [ref=e250]
                        - text: →
                      - link "Case study" [ref=e254] [cursor=pointer]:
                        - /url: /projects/ciris-ai/
          - generic [ref=e255]:
            - generic [ref=e256]:
              - generic [ref=e257]: Why I build in public
              - heading "Clarity, documentation, and measurable progress" [level=2] [ref=e258]
              - paragraph [ref=e259]: "I treat every project like it needs to be repeatable: document assumptions, log deployments, and capture the troubleshooting steps that keep handoffs smooth."
            - list [ref=e261]:
              - listitem [ref=e262]:
                - generic [ref=e266]:
                  - strong [ref=e267]: Design-first work
                  - text: "- accessibility, responsive layouts, and clear storytelling keep interfaces professional from day one."
              - listitem [ref=e268]:
                - generic [ref=e269]:
                  - strong [ref=e270]: Operational discipline
                  - text: "- GitHub Actions, monitoring scripts, and infrastructure notes accompany every deploy so future collaborators can trust the stack."
              - listitem [ref=e271]:
                - generic [ref=e274]:
                  - strong [ref=e275]: Honest storytelling
                  - text: "- case studies highlight the problem, approach, and measurable impact so recruiters see exactly what shipped."
          - figure [ref=e276]
          - generic [ref=e278]:
            - heading "Let's collaborate" [level=2] [ref=e281]
            - generic [ref=e283]:
              - generic [ref=e284]:
                - heading "Let's work together" [level=2] [ref=e285]
                - paragraph [ref=e287]:
                  - text: I respond within 24 hours with availability, relevant case studies, and a short plan for how we can collaborate. Need my resume? Email me at
                  - strong [ref=e288]:
                    - link "bradmatera@gmail.com" [ref=e289] [cursor=pointer]:
                      - /url: mailto:bradmatera@gmail.com
                  - text: and I'll send the PDF right away.
                - paragraph [ref=e291]:
                  - text: If you found me while searching for a web developer in Durand or Davis, Illinois, start with the
                  - link "local services page" [ref=e292] [cursor=pointer]:
                    - /url: /web-developer-durand-davis-illinois/
                  - text: or go straight to
                  - link "contact" [ref=e293] [cursor=pointer]:
                    - /url: /contact/
                  - text: .
              - generic [ref=e295]:
                - generic [ref=e296]:
                  - heading "Contact & next steps" [level=3] [ref=e297]
                  - list [ref=e298]:
                    - listitem [ref=e299]:
                      - strong [ref=e300]: "Email:"
                      - link "bradmatera@gmail.com" [ref=e301] [cursor=pointer]:
                        - /url: mailto:bradmatera@gmail.com
                        - link "bradmatera@gmail.com" [ref=e302]:
                          - /url: mailto:bradmatera@gmail.com
                    - listitem [ref=e303]:
                      - strong [ref=e304]: "LinkedIn:"
                      - link "/in/bradmatera →" [ref=e305] [cursor=pointer]:
                        - /url: https://www.linkedin.com/in/bradmatera
                        - paragraph [ref=e306]: /in/bradmatera
                        - text: →
                    - listitem [ref=e307]:
                      - strong [ref=e308]: "GitHub:"
                      - link "@BradleyMatera →" [ref=e309] [cursor=pointer]:
                        - /url: https://github.com/BradleyMatera
                        - paragraph [ref=e310]: "@BradleyMatera"
                        - text: →
                - generic [ref=e311]:
                  - heading "Collaborative delivery" [level=3] [ref=e312]
                  - paragraph [ref=e314]: I work best with mentorship and clear feedback loops, and I thrive in environments that value documentation, metrics, and thoughtful automation as much as clean interfaces.
          - figure [ref=e315]
          - generic [ref=e317]:
            - heading "About Brad" [level=2] [ref=e318]
            - generic [ref=e320]:
              - heading "How I got into tech — Tinkering first, school later" [level=2] [ref=e322]:
                - strong [ref=e323]: How I got into tech
                - text: — Tinkering first, school later
              - generic [ref=e324]:
                - paragraph [ref=e325]: I built my first PC when I was around 12. It was an old Gateway machine, and that is where a lot of this started. I spent a lot of time messing with HTML pages, installing game mods, and figuring out what broke when you changed things.
                - paragraph [ref=e326]: I did not go straight into software after high school. I spent years working in different fields, including the Army as a medic and later in operations, logistics, case management, and rescue work. Those jobs were intense, but they taught me how to stay calm when things get messy and how important clear documentation is.
                - paragraph [ref=e327]: I came back to tech seriously in 2023 when I enrolled in the Web Development program at Full Sail University. I graduated on October 31, 2025 with a Bachelor of Science in Web Development, finished as the salutatorian of the program, and graduated with a 3.64 GPA.
                - paragraph [ref=e328]: That is the version of me this page is meant to reflect. I am not trying to sound like a senior engineer. What I can say honestly is that I have been building a lot since March 2024, and GitHub has become the place where I work through ideas, test them, and keep a record of what I learned.
                - paragraph [ref=e329]:
                  - text: If you want the full timeline, certifications, and verified credentials, those live in the
                  - link "recruiter hub" [ref=e330] [cursor=pointer]:
                    - /url: /recruiter/
                  - text: . If you are here because you searched for a web developer in Durand, Davis, or nearby Northwest Illinois, I also put together a separate
                  - link "local work page" [ref=e331] [cursor=pointer]:
                    - /url: /web-developer-durand-davis-illinois/
                  - text: so the service area, proof, and fit are easy to scan.
          - figure [ref=e332]
          - generic [ref=e336]:
            - generic [ref=e337]:
              - heading "Credentials" [level=2] [ref=e338]
              - paragraph [ref=e339]:
                - text: The high-level facts. For full verification — dates, credential IDs, and badge links — see the
                - link "recruiter hub" [ref=e340] [cursor=pointer]:
                  - /url: /recruiter/
                - text: .
            - generic [ref=e341]:
              - generic [ref=e342]:
                - article [ref=e343]:
                  - generic [ref=e344]:
                    - heading "Degree - Full Sail University" [level=3] [ref=e345]:
                      - strong [ref=e346]: Degree
                      - text: "- Full Sail University"
                    - paragraph [ref=e347]: B.S. Web Development, October 2025. Salutatorian, 3.64 GPA.
                - article [ref=e348]:
                  - generic [ref=e349]:
                    - heading "Experience - AWS internship" [level=3] [ref=e350]:
                      - strong [ref=e351]: Experience
                      - text: "- AWS internship"
                    - paragraph [ref=e352]: Cloud Support Engineer intern at Amazon, summer 2025. Training environments, cloud troubleshooting workflows.
              - generic [ref=e353]:
                - article [ref=e354]:
                  - generic [ref=e355]: AWS Certified Solutions Architect – Associate
                  - generic [ref=e356]: Amazon Web Services (AWS)
                - article [ref=e357]:
                  - generic [ref=e358]: AWS Certified AI Practitioner
                  - generic [ref=e359]: Amazon Web Services (AWS)
                - article [ref=e360]:
                  - generic [ref=e361]: JavaScript Algorithms and Data Structures
                  - generic [ref=e362]: freeCodeCamp
                - article [ref=e363]:
                  - generic [ref=e364]: Foundational C# with Microsoft
                  - generic [ref=e365]: freeCodeCamp
          - figure [ref=e366]
          - generic [ref=e370]:
            - heading "Let's talk — Open to junior roles, freelance work, and collaborations" [level=2] [ref=e372]:
              - strong [ref=e373]: Let's talk
              - text: — Open to junior roles, freelance work, and collaborations
            - generic [ref=e374]:
              - paragraph [ref=e375]: I am looking for opportunities to grow and collaborate. If you need someone eager to learn, build useful things, and communicate clearly, whether that is a small freelance job or a junior developer role, I would like to talk.
              - list [ref=e376]:
                - listitem [ref=e377]:
                  - text: •
                  - strong [ref=e378]: "Email:"
                  - link "bradmatera@gmail.com" [ref=e379] [cursor=pointer]:
                    - /url: mailto:bradmatera@gmail.com
                - listitem [ref=e380]:
                  - text: •
                  - strong [ref=e381]: "LinkedIn:"
                  - link "/in/bradmatera →" [ref=e382] [cursor=pointer]:
                    - /url: https://www.linkedin.com/in/bradmatera
                - listitem [ref=e383]:
                  - text: •
                  - strong [ref=e384]: "GitHub:"
                  - link "@BradleyMatera →" [ref=e385] [cursor=pointer]:
                    - /url: https://github.com/BradleyMatera
                - listitem [ref=e386]:
                  - text: •
                  - strong [ref=e387]: "Dev.to:"
                  - link "@bradleymatera →" [ref=e388] [cursor=pointer]:
                    - /url: https://dev.to/bradleymatera
              - generic [ref=e389]:
                - link "View case studies" [ref=e390] [cursor=pointer]:
                  - /url: /recruiter/#project-explorer
                - link "Open contact page" [ref=e391] [cursor=pointer]:
                  - /url: /contact/
        - generic [ref=e395]:
          - heading "Latest writing" [level=2] [ref=e397]
          - link "Browse the archive" [ref=e399] [cursor=pointer]:
            - /url: /blog/
        - generic [ref=e401]:
          - article [ref=e402]:
            - 'link "AWS Free Tier: What Actually Costs Money" [ref=e403] [cursor=pointer]':
              - /url: /aws-free-tier-honest-guide/
            - generic [ref=e404]:
              - time [ref=e405]: 08.07.2026
              - generic [ref=e406]: · 8 min read
            - paragraph [ref=e407]: A clear free tier checklist with exact console steps, verification checks, and official AWS pricing links.
            - link "Read article" [ref=e409] [cursor=pointer]:
              - /url: /aws-free-tier-honest-guide/
          - article [ref=e410]:
            - 'link "AWS Cloud Support Internship: What I Actually Practiced" [ref=e411] [cursor=pointer]':
              - /url: /aws-cloud-support-internship-mastering-troubleshooting-and-architecture/
            - generic [ref=e412]:
              - time [ref=e413]: 08.07.2026
              - generic [ref=e414]: · 10 min read
            - paragraph [ref=e415]: "A clear, bounded summary of my AWS Cloud Support internship: the training environment, daily troubleshooting workflow, capstone project, and what I did not do."
            - link "Read article" [ref=e417] [cursor=pointer]:
              - /url: /aws-cloud-support-internship-mastering-troubleshooting-and-architecture/
          - article [ref=e418]:
            - 'link "AWS vs. Azure vs. Google Cloud: A 2026 Free Tier Comparison From Real Use" [ref=e419] [cursor=pointer]':
              - /url: /aws-vs-azure-vs-google-cloud/
            - generic [ref=e420]:
              - time [ref=e421]: 08.07.2026
              - generic [ref=e422]: · 6 min read
            - paragraph [ref=e423]: What I actually noticed when running small projects on AWS, Azure, and GCP free tiers in 2026.
            - link "Read article" [ref=e425] [cursor=pointer]:
              - /url: /aws-vs-azure-vs-google-cloud/
        - generic [ref=e427]:
          - generic [ref=e428]:
            - generic [ref=e429]: Keep exploring
            - heading "Curious about the process behind these projects?" [level=2] [ref=e430]
          - generic [ref=e431]:
            - generic [ref=e432]: The blog breaks down what I learn from each build—architecture decisions, accessibility wins, and what I'd improve next time.
            - generic [ref=e433]:
              - paragraph [ref=e435]: Skim the latest posts below or dive into the archives to see how each project has evolved. I include code snippets, diagrams, and checklists so you can reuse the patterns in your own work.
              - generic [ref=e436]:
                - link "Browse engineering articles" [ref=e437] [cursor=pointer]:
                  - /url: /blog/
                  - paragraph [ref=e438]: Browse engineering articles
                - link "View skills & experience" [ref=e439] [cursor=pointer]:
                  - /url: /
                  - paragraph [ref=e440]: View skills & experience
    - contentinfo [ref=e441]:
      - generic [ref=e442]:
        - generic [ref=e443]:
          - paragraph [ref=e444]: Bradley Matera — Portfolio
          - paragraph [ref=e445]: Bradley Matera — Web development for Northwest Illinois
          - generic [ref=e446]:
            - link "View project portfolio" [ref=e447] [cursor=pointer]:
              - /url: /recruiter/#project-explorer
            - link "Read latest blog posts" [ref=e448] [cursor=pointer]:
              - /url: /blog/
        - generic [ref=e449]:
          - generic [ref=e450]:
            - paragraph [ref=e451]: Explore
            - list [ref=e452]:
              - listitem [ref=e453]:
                - link "About Brad" [ref=e454] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e455]:
                - link "Blog" [ref=e456] [cursor=pointer]:
                  - /url: /blog/
              - listitem [ref=e457]:
                - link "For Recruiter" [ref=e458] [cursor=pointer]:
                  - /url: /recruiter/
              - listitem [ref=e459]:
                - link "Contact" [ref=e460] [cursor=pointer]:
                  - /url: /contact/
              - listitem [ref=e461]:
                - link "Store" [ref=e462] [cursor=pointer]:
                  - /url: /store/
              - listitem [ref=e463]:
                - link "Customer portal" [ref=e464] [cursor=pointer]:
                  - /url: /purchases/
              - listitem [ref=e465]:
                - link "Northwest Illinois web development" [ref=e466] [cursor=pointer]:
                  - /url: /web-developer-durand-davis-illinois/
          - generic [ref=e467]:
            - paragraph [ref=e468]: Connect
            - list [ref=e469]:
              - listitem [ref=e470]:
                - link "LinkedIn →" [ref=e471] [cursor=pointer]:
                  - /url: https://www.linkedin.com/in/bradmatera
              - listitem [ref=e472]:
                - link "GitHub →" [ref=e473] [cursor=pointer]:
                  - /url: https://github.com/BradleyMatera
              - listitem [ref=e474]:
                - link "Dev.to →" [ref=e475] [cursor=pointer]:
                  - /url: https://dev.to/bradleymatera
              - listitem [ref=e476]:
                - link "YouTube →" [ref=e477] [cursor=pointer]:
                  - /url: https://www.youtube.com/@bradmatera
        - generic [ref=e478]:
          - paragraph [ref=e479]: Quick stats
          - list [ref=e480]:
            - listitem [ref=e481]: AWS Cloud Support Engineer Intern — Amazon
            - listitem [ref=e482]: Based in the Midwest — open to Seattle on-site or remote
            - listitem [ref=e483]: Serving Durand, Davis, and nearby Northwest Illinois
      - generic [ref=e484]:
        - generic [ref=e485]: © 2026 Bradley Matera — Portfolio
        - link "Hiring? View the recruiter hub →" [ref=e487] [cursor=pointer]:
          - /url: /recruiter/
        - generic [ref=e488]: As an Amazon Associate I earn from qualifying purchases.
    - button "Back to top":
      - generic: ↑
      - generic: Back to top
  - generic [ref=e489]: Navigated to Bradley Matera — Portfolio
```

# Test source

```ts
  9   | const OCEAN_PAGE_BG = "#050e18";
  10  | const DEFAULT_PAGE_BG = "#f3efe8";
  11  | 
  12  | const getRootVariable = (page: Page, name: string) =>
  13  |   page.evaluate((key) => document.documentElement.style.getPropertyValue(key).trim(), name);
  14  | 
  15  | const getDataTheme = (page: Page) =>
  16  |   page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  17  | 
  18  | const openStyleLab = async (page: Page) => {
  19  |   await page.locator('button[aria-label="Open Web Designer Lab"]:visible').first().click();
  20  |   await expect(page.locator(".style-lab")).toBeVisible();
  21  | };
  22  | 
  23  | const applyPreset = async (page: Page, presetName: string) => {
  24  |   await openStyleLab(page);
  25  |   await page.locator(".style-lab__preset", { hasText: presetName }).click();
  26  |   await page.locator(".style-lab__done").click();
  27  |   await expect(page.locator(".style-lab")).toBeHidden();
  28  | };
  29  | 
  30  | const collectHydrationErrors = (page: Page): string[] => {
  31  |   const errors: string[] = [];
  32  |   page.on("console", (msg) => {
  33  |     if (msg.type() === "error" && /#418|#423|hydrat/i.test(msg.text())) {
  34  |       errors.push(msg.text());
  35  |     }
  36  |   });
  37  |   page.on("pageerror", (err) => {
  38  |     if (/#418|#423|hydrat/i.test(err.message)) errors.push(err.message);
  39  |   });
  40  |   return errors;
  41  | };
  42  | 
  43  | test.describe("Style Lab", () => {
  44  |   test.beforeEach(async ({ page }) => {
  45  |     await page.goto("/");
  46  |   });
  47  | 
  48  |   test("toggle opens and closes the panel", async ({ page }) => {
  49  |     await openStyleLab(page);
  50  |     await expect(page.locator("#style-lab-title")).toHaveText("Web Designer Lab");
  51  |     await page.locator('button[aria-label="Close style lab"]').click();
  52  |     await expect(page.locator(".style-lab")).toBeHidden();
  53  |   });
  54  | 
  55  |   test("applying the Ocean preset changes page background and dark mode", async ({ page }) => {
  56  |     await applyPreset(page, "Ocean");
  57  |     expect(await getRootVariable(page, "--color-page-bg")).toBe(OCEAN_PAGE_BG);
  58  |     expect(await getDataTheme(page)).toBe("dark");
  59  |   });
  60  | 
  61  |   test("preset persists across reload", async ({ page }) => {
  62  |     await applyPreset(page, "Ocean");
  63  |     await page.reload();
  64  |     await page.waitForFunction(
  65  |       (expected) => document.documentElement.style.getPropertyValue("--color-page-bg").trim() === expected,
  66  |       OCEAN_PAGE_BG
  67  |     );
  68  |     expect(await getDataTheme(page)).toBe("dark");
  69  |   });
  70  | 
  71  |   test("reset restores Brad's Default", async ({ page }) => {
  72  |     await applyPreset(page, "Ocean");
  73  |     await openStyleLab(page);
  74  |     await page.locator(".style-lab__reset").click();
  75  |     await page.locator(".style-lab__done").click();
  76  |     expect(await getRootVariable(page, "--color-page-bg")).toBe(DEFAULT_PAGE_BG);
  77  |     expect(await getDataTheme(page)).toBe("light");
  78  |   });
  79  | 
  80  |   test("base mode switch enters custom mode and applies dark tokens", async ({ page }) => {
  81  |     await openStyleLab(page);
  82  |     await page.locator(".style-lab__mode-btn", { hasText: "Dark" }).click();
  83  |     await expect(page.locator(".style-lab__mode-btn", { hasText: "Dark" })).toHaveAttribute(
  84  |       "aria-pressed",
  85  |       "true"
  86  |     );
  87  |     await page.locator(".style-lab__done").click();
  88  |     expect(await getDataTheme(page)).toBe("dark");
  89  |     expect(await getRootVariable(page, "--color-page-bg")).toBe("#000000");
  90  |   });
  91  | });
  92  | 
  93  | test.describe("Recruiter isolation", () => {
  94  |   test("style lab overrides are cleared on /recruiter/ and restored on return", async ({ page }) => {
  95  |     await page.goto("/");
  96  |     await applyPreset(page, "Ocean");
  97  |     expect(await getRootVariable(page, "--color-page-bg")).toBe(OCEAN_PAGE_BG);
  98  | 
  99  |     // Client-side navigate to the recruiter hub.
  100 |     await page.locator('a[href*="/recruiter"]:visible').first().click();
  101 |     await page.waitForURL("**/recruiter/**");
  102 |     await page.waitForFunction(
  103 |       () => document.documentElement.style.getPropertyValue("--color-page-bg").trim() === ""
  104 |     );
  105 |     expect(await getDataTheme(page)).toBe("dark");
  106 | 
  107 |     // Navigate back home — the preset should re-apply.
  108 |     await page.goBack();
> 109 |     await page.waitForFunction(
      |                ^ Error: page.waitForFunction: Test timeout of 60000ms exceeded.
  110 |       (expected) => document.documentElement.style.getPropertyValue("--color-page-bg").trim() === expected,
  111 |       OCEAN_PAGE_BG
  112 |     );
  113 |   });
  114 | 
  115 |   test("hard load of /recruiter/ has no style lab overrides", async ({ page }) => {
  116 |     await page.goto("/");
  117 |     await applyPreset(page, "Ocean");
  118 |     await page.goto("/recruiter/");
  119 |     await page.waitForFunction(
  120 |       () => document.documentElement.style.getPropertyValue("--color-page-bg").trim() === ""
  121 |     );
  122 |     expect(await getDataTheme(page)).toBe("dark");
  123 |   });
  124 | });
  125 | 
  126 | test.describe("Scout chat widget", () => {
  127 |   test("appears on /recruiter/ hard load without hydration errors", async ({ page }) => {
  128 |     const hydrationErrors = collectHydrationErrors(page);
  129 |     await page.goto("/recruiter/");
  130 |     await expect(page.locator("#bradley-chat")).toBeVisible({ timeout: 30_000 });
  131 |     expect(hydrationErrors).toEqual([]);
  132 |   });
  133 | 
  134 |   test("is not present on the homepage or blog", async ({ page }) => {
  135 |     await page.goto("/");
  136 |     await page.waitForTimeout(3000);
  137 |     await expect(page.locator("#bradley-chat")).toHaveCount(0);
  138 |     await page.goto("/blog/");
  139 |     await page.waitForTimeout(3000);
  140 |     await expect(page.locator("#bradley-chat")).toHaveCount(0);
  141 |   });
  142 | 
  143 |   test("survives recruiter -> home -> recruiter round trip", async ({ page }) => {
  144 |     await page.goto("/recruiter/");
  145 |     await expect(page.locator("#bradley-chat")).toBeVisible({ timeout: 30_000 });
  146 | 
  147 |     // Leave the recruiter hub — the widget must be hidden.
  148 |     await page.locator('a[href="/"]:visible').first().click();
  149 |     await page.waitForURL((url) => !url.pathname.startsWith("/recruiter"));
  150 |     await expect(page.locator("#bradley-chat")).toBeHidden();
  151 | 
  152 |     // Return — the widget must come back without re-injecting the script.
  153 |     await page.goBack();
  154 |     await page.waitForURL("**/recruiter/**");
  155 |     await expect(page.locator("#bradley-chat")).toBeVisible({ timeout: 15_000 });
  156 |     const scriptCount = await page.locator("#projecthub-chat-script").count();
  157 |     expect(scriptCount).toBeLessThanOrEqual(1);
  158 |   });
  159 | });
  160 | 
```