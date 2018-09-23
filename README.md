Formailer :mailbox:
-------------------

#### Form ---> Email Microservice

**What for?** I am hosting my personal portfolio on Github Pages and while it's awesome and free, it is restricted to static webpages! So I needed a way to rig form logic for the contact form on my portfolio. 

**How I did it** I buit this basic Express app that parses POST requests from the form and hooks to Gmail SMTP server via the Nodemailer library. Then I updated my static form to send POST request to this custom endpoint. Boom, problem solved!



༼ つ ◕_◕ ༽つ
