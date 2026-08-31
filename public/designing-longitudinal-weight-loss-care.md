# DESIGNING LONGITUDINAL WEIGHT-LOSS CARE

Building Amazon One Medical’s cash-pay GLP-1 experience on top of a telehealth model designed for one-off care

**Amazon Health Services · Amazon One Medical**  
**Role:** Sole Product Designer  
**Duration:** ~1 year end-to-end; ~6–7 months of core product design  
**Themes:** 0→1 Product Design · Healthcare · Systems Thinking · Growth  

---

## EXECUTIVE SUMMARY

Amazon One Medical’s Pay-per-visit product was originally designed around episodic healthcare: a customer has a condition like pink eye or a UTI, completes an intake, sees a provider, gets a treatment plan, and leaves.

Weight-loss treatment challenged that model.

GLP-1 care can span months. A patient may need clinical eligibility screening, lab work, medication selection, dose changes, pharmacy fulfillment, follow-up visits, side-effect management, prescription renewals, and reminders at different points in the journey.

Our goal was to expand Pay-per-visit into cash-pay longitudinal care, starting with weight loss.

As the sole product designer, I designed the end-to-end patient experience and the system underneath it: how patients enter the program, qualify for treatment, complete clinical requirements, choose medication preferences, receive a treatment plan, fulfill prescriptions, and return for ongoing care.

The central product decision was to move beyond a collection of independent visits and introduce a **Case**: a persistent layer connecting visits, labs, treatment plans, messaging, prescriptions, and follow-ups into a single treatment journey.

Before launch, I tested the end-to-end experience with six participants. All six understood the overall structure, validating the longitudinal model, while testing exposed high-severity gaps around total cost transparency and informed medication selection that we addressed before launch.

---

## 1. THE OPPORTUNITY: FROM EPISODIC TO LONGITUDINAL CARE

Amazon One Medical offered two fundamentally different models of care.

Traditional One Medical supported ongoing primary care. Pay-per-visit, on the other hand, had been optimized for occasional, one-off conditions such as acne, pink eye, sinus infections, or UTIs.

At the same time, weight loss—and particularly GLP-1 medication—was becoming one of the largest emerging areas in healthcare.

There was also an important gap in how people accessed treatment.

Not every patient who wanted weight-loss care wanted to navigate an insurance-based pathway. Insurance coverage for GLP-1s could vary, prior authorization could introduce significant friction, and some customers preferred the predictability and convenience of paying directly for treatment.

That created an opportunity:

> Could Pay-per-visit support ongoing treatment while preserving the simplicity and transparency of a cash-pay product?

Importantly, this wasn't an “uninsured patient” product. It was a cash-pay pathway. A customer could have insurance and still choose to pay directly for care and medication rather than navigate insurance coverage.

---

## 2. WHY THIS WASN'T JUST ANOTHER CONDITION

The tempting solution was to add Weight Loss alongside the other conditions already available through PPV.

But GLP-1 treatment broke several assumptions the existing product was built around.

**Episodic care:**  
`Condition → Visit → Treatment plan → Follow-up messaging → Done`

**Weight-loss care:**  
`Eligibility → Labs → Initial visit → Medication → Fulfillment → Monitoring → Follow-up → Dose changes → Renewal → Repeat`

### 1) The unit of care was no longer a visit
A patient's second weight-loss visit depended on what happened during their first.
- What medication were they prescribed?
- Did they complete their labs?
- What dose were they currently taking?
- Were they experiencing side effects?
- Was another visit or renewal due?

Individual visits couldn't fully represent that relationship.

### 2) Eligibility affected the journey itself
GLP-1 care involves real contraindications and clinical requirements.  
Depending on someone's medical history, medications, BMI, pregnancy status, prior treatment, labs, and state, they might continue, continue with additional guidance, provide additional information, or exit the service entirely.  
Clinical policy couldn't simply sit behind the UI. It directly shaped the product.

### 3) Important parts of care happened outside One Medical
Patients might need labs from an external lab partner and could fulfill their prescription through Amazon Pharmacy or another pharmacy.  
The experience therefore had to stay coherent even when the customer crossed organizational and product boundaries.

### 4) Medication changes over time
Treatment may begin with a starter dose and evolve through continued clinical assessment.

### 5) Customers had to come back
For acute care, returning is optional.  
For longitudinal treatment, returning at the right moment is part of the product.  
That meant emails, notifications, reminders, and resumable states weren't peripheral communication—they became part of the care experience itself.

---

## 3. MY ROLE

I was the sole product designer for the cash-pay GLP-1 experience.

I worked across the complete journey, from discovery through treatment and ongoing care, partnering primarily with product and engineering while coordinating with:
- One Medical clinical stakeholders
- Legal and regulatory partners
- Amazon Pharmacy product and design
- Lab partners, including Labcorp
- Amazon surfaces that could drive customers into care
- Adjacent One Medical platform teams

I worked with clinical and legal stakeholders to understand what the system needed to enforce. My role wasn't to determine clinical eligibility; it was to determine how those clinical decisions became understandable, safe, and recoverable patient experiences.

---

## 4. MAPPING A YEAR OF CARE BEFORE DESIGNING SCREENS

A single happy-path flow wasn't enough to understand this product.

I mapped the treatment experience longitudinally across approximately 15 months, including visits, medication, labs, pharmacy fulfillment, messaging windows, reminders, follow-ups, and renewals.

This exposed dependencies that were easy to miss when looking at one visit at a time.

For example:
- A lab requirement might originate during the first intake but block a later prescription.
- A messaging window opened after one visit but expired before another.
- Medication could be fulfilled monthly while clinical visits occurred much less frequently.
- A customer who returned three months later shouldn't be treated like someone starting from scratch.

The service blueprint became a shared model for reasoning about patient state over time, rather than simply a map of screens.

---

## 5. A KEY PRODUCT DECISION: INTRODUCING THE CASE

The existing model centered individual visits. I proposed adding a persistent Case above them.

I considered three approaches:

- **Option A: Keep every visit independent**  
  *Advantage:* Reuses PPV architecture and is the fastest path.  
  *Tradeoff:* Patients experience fragmented transactions, and the product has no clear home for longitudinal state.

- **Option B: Build a new subscription or program product**  
  *Advantage:* Naturally supports ongoing care.  
  *Tradeoff:* Requires a much larger business and engineering change and moves away from the simplicity of cash-pay PPV.

- **Option C: Introduce a Case above existing visits**  
  *Advantage:* Adds continuity while preserving existing visit and payment infrastructure.  
  *Tradeoff:* Requires new patient-state logic and decisions about when a Case begins, changes, and ends.

I chose Option C. A Weight Loss Case could connect:  
`Initial visit → Labs → Treatment plan → Prescription and pharmacy → Messaging → Follow-up visits → Renewal`

This was the balance we needed. The visit remained a transaction; the Case became the relationship. Patients could understand their care as one ongoing treatment journey while the platform continued to use many of its existing primitives underneath.

---

## 6. TURNING CLINICAL RULES INTO PATIENT EXPERIENCES

The intake experience was not simply a questionnaire. Behind it sat a decision model covering factors such as location/state requirements, treatment history, BMI, contraindications, medications, pregnancy, prior GLP-1 use, and lab availability.

Working with PM, legal, and One Medical stakeholders, we translated these requirements into three broad system outcomes:
- **Continue:** The patient could proceed normally.
- **Continue with guidance:** Treatment might still be possible, but additional information, action, or acknowledgement was required.
- **Stop:** The service could not safely or legally provide treatment through this pathway.

The design challenge was what happened after the rule fired. Instead of treating eligibility as an opaque approved / denied decision, I designed each state around four questions:
1. What happened?
2. Why does it matter?
3. Can I fix it?
4. What should I do next?

This became one of the core principles of the product: **Clinical friction should feel purposeful, not arbitrary.**

---

## 7. DESIGNING ACROSS COMPANY BOUNDARIES

Several of the hardest moments in the journey occurred at places where Amazon One Medical didn't control the entire experience.

### LABS
Patients could arrive with recent lab results, need to upload existing results, or need new testing. We worked with Labcorp as a lab pathway, including discounted pricing available through Amazon.
The design had to make four things clear:
- What tests were required
- Why they were needed
- Where customers could obtain them
- What happened afterward

### AMAZON PHARMACY
I worked closely with the Amazon Pharmacy PM and designer to design both sides of another critical handoff. The experience had to make several distinctions understandable:
- Medication preference is not a guaranteed prescription.
- Care cost is separate from medication cost.
- Amazon Pharmacy is convenient, but it is not required.
- A clinician—not the shopping experience—determines appropriate treatment.

---

## 8. VALIDATING THE COMPLETE EXPERIENCE

Once V1 was coherent end-to-end, I tested an unbranded Figma prototype through UserTesting with six participants.

The most important result was reassuring: **6 of 6 participants understood the overall program structure.** The journey from intake through treatment plan was rated from “semi-easy” to “very easy.”

---

## 9. RESEARCH CHANGED WHERE WE FOCUSED

- **FINDING 1 — CUSTOMERS DIDN'T THINK ABOUT PRICE TRANSACTIONALLY (5/6 participants - High severity):** Customers asked "How much is this treatment actually going to cost me over time?" We consolidated cost information and made the relationship between care, labs, and medication explicit.
- **FINDING 2 — WE HAD MADE MEDICATION CHOICE FEEL TOO MUCH LIKE SHOPPING (4/6 participants - High severity):** Participants wanted clinical context (dosing frequency, side effects, outcomes). We rebalanced the experience to provide clinical context alongside price.
- **FINDING 3 — LABS WERE UNDERSTOOD; OBTAINING THEM WASN'T ALWAYS CLEAR (2/6 participants - Medium severity):** We made lab procurement options and costs more prominent.

---

## 10. DESIGNING THE LONGITUDINAL LIFECYCLE

I extended the journey into lifecycle surfaces including email and notifications for outstanding lab actions, treatment plans, follow-ups, and renewals.

---

## 11. SHIPPING SAFELY AT AMAZON SCALE

The experience went through beta validation followed by a staged production rollout across One Medical, clinical policy, legal, lab partners, Amazon Pharmacy, and lifecycle communications.

---

## 12. THE RESULT

The finished system enabled customers to discover care, complete screening, navigate labs, express medication preferences, consult a clinician, receive a treatment plan, fulfill prescriptions, message care teams, and return for ongoing care.

---

## 13. THE PLATFORM EVOLVED WHILE WE WERE BUILDING IT

Health AI introduced a proactive orchestration layer on top of the Case, supporting entry and resumption from Amazon Search, Amazon Pharmacy, email, notifications, One Medical, and Health AI into the same underlying care journey.

---

## IF I WERE EXTENDING IT TODAY

Health AI creates the opportunity to put a more proactive orchestration layer on top of the Case. The fundamental product model remains: **Care is not a sequence of screens or visits. It's a continuously changing patient state.**

---

## WHAT THIS PROJECT TAUGHT ME

The hardest part was taking a business model designed for a transaction and asking: *What needs to become true for this product to support a relationship?* Complex underneath, obvious to the customer.
