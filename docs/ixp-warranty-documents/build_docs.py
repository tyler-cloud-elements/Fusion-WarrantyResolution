#!/usr/bin/env python3
"""Generate realistic warranty-case documents for the FUSION 2026 IXP workshop."""
import os, subprocess, sys

OUT = "/Users/robert.love/Unsynced/FUSION 2026/outputs/ixp-warranty-documents"
os.makedirs(OUT, exist_ok=True)
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

BASE = """
@page { size: Letter; margin: 0.7in; }
body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 9.5pt; line-height: 1.45; color: #1a1a1a; }
h1 { font-size: 15pt; margin: 0 0 2pt; letter-spacing: -0.2pt; }
h2 { font-size: 10.5pt; margin: 16pt 0 5pt; padding-bottom: 2pt; border-bottom: 1px solid #ccc; }
h3 { font-size: 9.5pt; margin: 11pt 0 3pt; }
p { margin: 0 0 7pt; }
table { border-collapse: collapse; width: 100%; margin: 6pt 0 10pt; font-size: 8.5pt; }
th { background: #f0f0f0; text-align: left; padding: 4pt 6pt; border: 1px solid #bbb; font-weight: 600; }
td { padding: 4pt 6pt; border: 1px solid #ccc; vertical-align: top; }
.meta { font-size: 8pt; color: #555; }
.rule { border-top: 2px solid #222; margin: 8pt 0 12pt; }
.sig { margin-top: 22pt; border-top: 1px solid #999; width: 250px; padding-top: 3pt; font-size: 8pt; }
.note { background: #f7f7f5; border-left: 3px solid #999; padding: 7pt 10pt; margin: 9pt 0; font-size: 8.5pt; }
ol, ul { margin: 0 0 8pt 16pt; padding: 0; }
li { margin-bottom: 3pt; }
.small { font-size: 8pt; color: #666; }
"""

DOCS = {}

# ---------------------------------------------------------------- 1. WARRANTY T&C
DOCS["cobalt-ridge-warranty-terms.pdf"] = """
<style>%s
.hdr { display:flex; justify-content:space-between; align-items:flex-start; }
.brand { font-size:13pt; font-weight:700; letter-spacing:2pt; }
.clause { margin-bottom:9pt; }
.clause b { display:inline; }
</style>
<div class="hdr">
  <div><div class="brand">COBALT RIDGE</div>
  <div class="meta">AUTOMATION &middot; Milwaukee, Wisconsin</div></div>
  <div class="meta" style="text-align:right">
    Document CR-LEG-WTY-0007<br>Revision 9.1<br>Effective 1 March 2026
  </div>
</div>
<div class="rule"></div>
<h1>Limited Equipment Warranty</h1>
<p class="meta">Sortation, conveyance, and integrated controls systems &middot; Commercial and industrial customers</p>

<h2>1. Coverage period</h2>
<div class="clause"><b>1.1</b> Cobalt Ridge Automation warrants each unit of Covered Equipment against defects in
material and workmanship for twenty-four (24) months from the date of Substantial Completion, or thirty (30) months
from date of shipment, whichever expires first.</div>
<div class="clause"><b>1.2</b> Replacement components installed by Cobalt Ridge or an Authorized Service Provider
carry the remainder of the original term or ninety (90) days from installation, whichever is longer.</div>
<div class="clause"><b>1.3</b> Consumable items listed in Schedule B, including belts, rollers, photo-eyes, and
filter elements, are excluded from this Section and are governed by Schedule B service intervals.</div>

<h2>2. Scope of remedy</h2>
<div class="clause"><b>2.1</b> The Customer's sole remedy is, at Cobalt Ridge's election, repair of the affected
component, replacement with a component of equal or superior specification, or issuance of credit not exceeding the
depreciated value of the affected component.</div>
<div class="clause"><b>2.2</b> Labor and travel are covered during Standard Service Hours (07:00 to 17:00 local,
Monday through Friday, excluding published holidays). Work performed outside Standard Service Hours is billable at
the prevailing premium rate unless a Priority Response Addendum is in force for the Site.</div>
<div class="clause"><b>2.3</b> This warranty does not extend to consequential losses, including lost throughput,
missed shipping windows, spoilage, contractual penalties owed by the Customer to third parties, or overtime incurred
by Customer personnel.</div>

<h2>3. Exclusions</h2>
<p>Coverage is void as to any affected component where the failure is attributable, in whole or in material part, to
any of the following:</p>
<div class="clause"><b>3.1 Unapproved modification.</b> Any alteration of mechanical assembly, drive selection,
or controls parameters that departs from the Released Configuration Baseline for the Site, unless the alteration was
authorized in writing by Cobalt Ridge Engineering prior to being placed in service.</div>
<div class="clause"><b>3.2 Non-approved components.</b> Installation of any drive, motor, gearbox, controller, or
safety device that is not listed on the Approved Parts List for the applicable baseline revision. Components
described by a third party as "equivalent", "compatible", or "form-fit-function" are not approved parts for purposes
of this Section unless separately qualified in writing.</div>
<div class="clause"><b>3.3 Service by unauthorized parties.</b> Repair, replacement, or controls adjustment
performed by any party other than Cobalt Ridge or an Authorized Service Provider, where such work is a contributing
cause of the failure.</div>
<div class="clause"><b>3.4 Operating conditions.</b> Operation outside the environmental, duty-cycle, or throughput
limits stated in the System Design Specification, including sustained operation above rated case temperature.</div>
<div class="clause"><b>3.5 Maintenance.</b> Failure to perform and record the preventive maintenance tasks in
Schedule B at the stated intervals.</div>

<h2>4. Prior authorization</h2>
<div class="clause"><b>4.1</b> The Customer shall obtain written authorization from Cobalt Ridge before performing,
or permitting any third party to perform, any of the following on Covered Equipment: replacement of a drive or motor
assembly; modification of controls parameters governing drive current, acceleration ramp, or thermal cutback;
alteration of divert timing; or any change affecting a safety-rated circuit.</div>
<div class="clause"><b>4.2</b> Work performed without the authorization required by 4.1 does not automatically void
coverage for unrelated components, but the Customer bears the burden of demonstrating that the unauthorized work was
not a contributing cause of the failure under review.</div>
<div class="clause"><b>4.3</b> Authorization requests are ordinarily answered within one (1) Business Day. Where the
Customer reports a Line Down condition, Cobalt Ridge will endeavor to respond within four (4) hours, and may issue a
Provisional Authorization permitting containment work to proceed pending full review.</div>

<h2>5. Claims and evidence</h2>
<div class="clause"><b>5.1</b> Claims must be submitted within thirty (30) days of the Customer becoming aware of the
condition. Claims submitted after ninety (90) days are time-barred except where the Customer demonstrates that the
condition was not reasonably discoverable.</div>
<div class="clause"><b>5.2</b> The Customer shall preserve and make available: alarm and event history covering the
period from twenty-four (24) hours before the condition through restoration; maintenance records for the preceding
twelve (12) months; records of any third-party work; and the failed component itself where replacement is claimed.</div>
<div class="clause"><b>5.3</b> Failed components are the property of Cobalt Ridge upon issuance of credit or
replacement, and shall be returned within twenty-one (21) days of the Return Material Authorization. Failure to
return a component may result in reversal of credit.</div>

<h2>6. Commercial exceptions</h2>
<div class="clause"><b>6.1</b> Nothing in this warranty limits Cobalt Ridge's discretion to authorize goodwill
assistance outside strict coverage where it determines that doing so is commercially warranted. Any such assistance
is granted case by case, does not establish a course of dealing, and does not waive any exclusion in Section 3.</div>
<div class="clause"><b>6.2</b> Goodwill assistance exceeding the delegated authority of the assigned Warranty
Resolution Lead requires concurrence from Finance. Delegated limits are maintained in the Warranty Approval Matrix
and reviewed annually.</div>

<h2>7. Limitation</h2>
<p>EXCEPT AS EXPRESSLY STATED, COBALT RIDGE MAKES NO WARRANTY, EXPRESS OR IMPLIED, AND SPECIFICALLY DISCLAIMS ANY
IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. TOTAL LIABILITY UNDER THIS WARRANTY SHALL
NOT EXCEED THE PURCHASE PRICE OF THE AFFECTED EQUIPMENT.</p>

<div class="sig">Authorized signature &middot; Office of the General Counsel</div>
<p class="small" style="margin-top:14pt">Illustrative document created for the FUSION 2026 demonstration. Cobalt Ridge
Automation is fictional and this text has no legal effect.</p>
""" % BASE

# ---------------------------------------------------------------- 2. SOP
DOCS["warranty-SOP-v3.pdf"] = """
<style>%s
.sopbar { background:#1f3a5f; color:#fff; padding:10pt 12pt; }
.sopbar h1 { color:#fff; font-size:14pt; }
.sopbar .meta { color:#c9d8ea; }
.step { border-left:3px solid #1f3a5f; padding-left:9pt; margin-bottom:10pt; }
</style>
<div class="sopbar">
  <h1>SOP-AFT-014 &middot; Warranty Resolution</h1>
  <div class="meta">Aftermarket Operations &middot; Version 3.0 &middot; Approved 12 February 2026 &middot; Next review February 2027</div>
</div>
<p class="meta" style="margin-top:8pt">Owner: Director, Aftermarket Operations &nbsp;|&nbsp; Applies to: all sortation
and conveyance installations, North America and Europe &nbsp;|&nbsp; Supersedes: SOP-AFT-014 v2.4</p>

<h2>1. Purpose and scope</h2>
<p>This procedure governs how Cobalt Ridge receives, evaluates, and resolves warranty claims on installed equipment.
It covers the period from first notification of a failure through financial settlement and product-quality feedback.
It does not cover new-equipment commissioning defects, which follow SOP-PRJ-006, or recall campaigns, which follow
SOP-QUA-002.</p>

<h2>2. Definitions</h2>
<table>
<tr><th style="width:26%%">Term</th><th>Meaning</th></tr>
<tr><td>Line Down</td><td>The customer cannot run the affected line or system at any throughput. Highest impact tier.</td></tr>
<tr><td>Degraded</td><td>The system runs below rated throughput or with a manual workaround in place.</td></tr>
<tr><td>Containment</td><td>A temporary measure that restores partial output or prevents further damage while the permanent repair is determined.</td></tr>
<tr><td>Coverage position</td><td>The current determination: covered, not covered, partially covered, or undetermined.</td></tr>
<tr><td>Combined cause</td><td>A finding that both a covered defect and an excluded condition contributed materially to the failure.</td></tr>
</table>

<h2>3. Impact classification and response targets</h2>
<table>
<tr><th>Tier</th><th>Definition</th><th>Acknowledge</th><th>Coverage position</th><th>Technician on site</th></tr>
<tr><td>1 &middot; Line Down</td><td>No throughput on affected line</td><td>30 minutes</td><td>4 hours</td><td>Same day where travel permits</td></tr>
<tr><td>2 &middot; Degraded</td><td>Reduced rate or manual workaround</td><td>2 hours</td><td>1 business day</td><td>2 business days</td></tr>
<tr><td>3 &middot; Impaired</td><td>Redundancy lost, output unaffected</td><td>1 business day</td><td>3 business days</td><td>Scheduled</td></tr>
<tr><td>4 &middot; Administrative</td><td>Documentation or credit only</td><td>2 business days</td><td>5 business days</td><td>Not applicable</td></tr>
</table>
<p class="small">Impact is set from customer throughput consequence, not from claim value. A low-value part that stops
a line is Tier 1.</p>

<h2>4. Procedure</h2>
<div class="step"><h3>4.1 Intake and impact triage</h3>
<p>Confirm the serialized asset and its site. Verify warranty status against the installed-base record. Capture the
customer's account of the failure verbatim before any interpretation is added. Set the impact tier with the customer
present on the call where possible. Open a single case; do not open parallel cases for the same event.</p></div>

<div class="step"><h3>4.2 Coverage and evidence review</h3>
<p>Assemble alarm and event history, service and maintenance history, the released configuration baseline, records
of any third-party work, and the applicable warranty terms. Name any evidence gap explicitly in the case rather than
proceeding on assumption.</p>
<p>Where the evidence supports more than one cause, record a combined cause. Do not resolve ambiguity by defaulting
to denial. A claim may only be denied where the excluded condition is demonstrably a material contributing cause and
the reasoning is recorded.</p></div>

<div class="step"><h3>4.3 Diagnose and contain</h3>
<p>Propose containment where the customer is at Tier 1 or Tier 2 and a permanent repair cannot be completed within
the response target. Containment must be reviewed for safety by a Reliability and Controls Engineer before it is
offered to the customer. Site personnel own shutdown, isolation, and restart. Cobalt Ridge does not operate customer
equipment under any circumstance.</p></div>

<div class="step"><h3>4.4 Resolution decision</h3>
<p>Prepare at least two options with cost, downtime, and residual risk stated for each. Check each option against the
warranty terms and against the approver's delegated authority before presenting. Where the recommended option departs
from the standard repair specification, obtain engineering sign-off before authorizing.</p></div>

<div class="step"><h3>4.5 Restore and validate</h3>
<p>Do not dispatch until parts are confirmed reserved and the site has confirmed a safe-to-service state. Restoration
is complete when the customer accepts the agreed functional test result, not when the technician closes the work
order.</p></div>

<div class="step"><h3>4.6 Close and learn</h3>
<p>Before closure, run the recurrence check against the same component family across the installed base for the
preceding one hundred eighty (180) days. Where three or more related failures are found, closure is blocked until a
product-quality investigation is opened with a named owner. Finalize the decision ledger.</p></div>

<h2>5. Approval authority</h2>
<table>
<tr><th>Role</th><th>Covered repair</th><th>Goodwill or commercial exception</th></tr>
<tr><td>Warranty Analyst</td><td>Up to $15,000</td><td>Not delegated</td></tr>
<tr><td>Warranty Resolution Lead</td><td>Up to $75,000</td><td>Up to $25,000</td></tr>
<tr><td>Manager, Aftermarket Operations</td><td>Up to $250,000</td><td>Up to $100,000</td></tr>
<tr><td>Director with Finance concurrence</td><td>Above $250,000</td><td>Above $100,000</td></tr>
</table>

<h2>6. Known weaknesses in the current process</h2>
<div class="note">Recorded at the v3.0 review. These are the items the process owner has flagged for improvement and
has not yet resolved.</div>
<ol>
<li>Evidence requests are issued late. In most reviewed cases the customer is asked for maintenance records and
third-party work orders only after the coverage review has already stalled, which adds one to three days.</li>
<li>Parts availability is confirmed after the resolution plan has been committed to the customer, so a
back-ordered part forces the plan and the customer commitment to be rebuilt.</li>
<li>The recurrence check runs at closure. Patterns are therefore detected on the third or fourth related case
rather than the second.</li>
<li>Coverage decisions on combined-cause fact patterns vary between analysts. There is no worked example set.</li>
</ol>

<h2>7. Records</h2>
<p>The case is the record. Email threads, spreadsheets, and call notes held outside the case are not the record and
are not admissible in a coverage dispute.</p>
<p class="small" style="margin-top:14pt">Illustrative document created for the FUSION 2026 demonstration. Cobalt Ridge
Automation is fictional.</p>
""" % BASE

# ---------------------------------------------------------------- 3. THIRD-PARTY SERVICE REPORT
DOCS["third-party-service-report.pdf"] = """
<style>%s
body { font-family: 'Courier New', Courier, monospace; font-size: 9pt; }
h1,h2,h3 { font-family:'Courier New',monospace; }
.mhdr { border:2px solid #000; padding:8pt 10pt; margin-bottom:10pt; }
.mhdr .co { font-size:14pt; font-weight:bold; letter-spacing:1pt; }
.grid { display:grid; grid-template-columns:1fr 1fr; gap:2pt 14pt; font-size:8.5pt; }
.fld { border-bottom:1px dotted #666; padding:2pt 0; }
.hand { font-family:'Bradley Hand','Segoe Script',cursive; font-size:10.5pt; }
table { font-family:'Courier New',monospace; }
</style>
<div class="mhdr">
  <div class="co">MERIDIAN INDUSTRIAL SERVICES</div>
  <div style="font-size:8pt">Contract Maintenance &middot; Material Handling &middot; 4471 W Dixie Hwy, Bolingbrook IL 60440 &middot; (630) 555-0148</div>
</div>

<div style="text-align:center;font-weight:bold;font-size:11pt;margin-bottom:8pt">FIELD SERVICE WORK ORDER</div>

<div class="grid">
  <div class="fld">W/O NUMBER: MIS-44182</div>
  <div class="fld">DATE OF SERVICE: 04/06/2026</div>
  <div class="fld">CUSTOMER: Northstar Retail Distribution</div>
  <div class="fld">PO REF: NRD-MNT-2026-0331</div>
  <div class="fld">SITE: Joliet DC, Bldg 2</div>
  <div class="fld">ARRIVED: 07:15 &nbsp;&nbsp; DEPARTED: 15:50</div>
  <div class="fld">EQUIPMENT: Sortation line, "SR440"</div>
  <div class="fld">TECHNICIAN: R. Vasquez, Lead Tech</div>
  <div class="fld">CALLED IN BY: T. Okafor, Maint Supv</div>
  <div class="fld">BILLING: T&amp;M, contract rate</div>
</div>

<div style="border:1px solid #000;padding:6pt 8pt;margin-top:10pt;font-size:8.5pt">
  <b>SERVICE CLASSIFICATION</b> (check all that apply)<br>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1pt 10pt;margin-top:4pt">
    <div>[X] Corrective repair</div><div>[ ] Preventive maint</div><div>[X] Parts replaced</div>
    <div>[ ] Warranty work</div><div>[X] Billable T&amp;M</div><div>[X] Controls modified</div>
    <div>[ ] OEM authorized</div><div>[ ] Full validation done</div><div>[X] Customer approved on site</div>
  </div>
</div>

<h2 style="margin-top:14pt">REPORTED CONDITION</h2>
<p>Customer reports intermittent stoppages on main sort line, 3-4 events per shift over prior two weeks.
Maint supv states drive is "running hot" and throwing overtemp faults during peak. Requests we look at
it before peak season. Customer indicates OEM lead time was quoted at 3 weeks and they cannot wait.</p>

<h2>WORK PERFORMED</h2>
<p>Checked drive enclosure temps at three points during run. Recorded 71C, 74C, 78C at power stage
housing under sustained load. Ambient in aisle was 29C. Drive fault log showed repeated thermal cutback
events. Visual on the existing unit shows discoloration on the heatsink face.</p>
<p>Advised customer the drive should be replaced. OEM unit not available in required window per customer.
Customer authorized substitution with equivalent unit from our stock. Installed unit as follows:</p>
<table>
<tr><th>Position</th><th>Removed</th><th>Installed</th></tr>
<tr><td>Main sort drive</td><td>CR-DRV-4410-B (Rev B), s/n 4410B-22781</td><td>Altek AD-5500-HD, s/n AD55-91043</td></tr>
</table>
<p>Substitute unit is rated at same HP and voltage. Frame and mounting pattern required a 6mm adapter plate,
fabricated on site. Unit is not a drop-in but fits within the existing guard envelope.</p>

<h2>CONTROLS ADJUSTMENTS</h2>
<p>Replacement drive would not hold the existing accel profile without tripping on the first divert wave.
Adjusted the following parameters to get the line running:</p>
<table>
<tr><th>Parameter</th><th>Was</th><th>Set to</th><th>Reason</th></tr>
<tr><td>ACCEL_RAMP_MS</td><td>420</td><td>610</td><td>Reduce inrush on start</td></tr>
<tr><td>CURRENT_LIM_PCT</td><td>115</td><td>135</td><td>Prevent nuisance trip at divert</td></tr>
<tr><td>THERM_CUTBACK_C</td><td>68</td><td>82</td><td>Substitute unit runs warmer by spec</td></tr>
</table>
<p>Line ran clean for 90 min observed after adjustment. Customer maintenance witnessed startup.</p>

<h2>TESTING / VALIDATION</h2>
<p>Performed run-in at operating speed for 90 minutes. Did NOT perform full OEM commissioning test sequence.
We do not have the OEM test fixture or the current baseline document on file for this line. Recommended
customer obtain sign-off from the OEM. Customer maintenance supervisor indicated they would "handle that
side of it."</p>

<h2>TECHNICIAN NOTES</h2>
<p class="hand">Told the supervisor twice that raising the thermal cutback is a stopgap and the root cause
of the original overheating was never established. He acknowledged. Recommend OEM review before peak.
Also the aisle has poor airflow, two of the four ceiling fans in that bay are not running.</p>

<h2>PARTS &amp; LABOR</h2>
<table>
<tr><th>Item</th><th>Qty</th><th>Amount</th></tr>
<tr><td>Altek AD-5500-HD drive assembly</td><td>1</td><td>$11,480.00</td></tr>
<tr><td>Adapter plate, fabricated</td><td>1</td><td>$340.00</td></tr>
<tr><td>Labor, lead technician, 8.5 hr</td><td>8.5</td><td>$1,487.50</td></tr>
<tr><td colspan="2" style="text-align:right"><b>TOTAL</b></td><td><b>$13,307.50</b></td></tr>
</table>

<div style="display:flex;gap:40pt;margin-top:18pt">
  <div class="sig">Technician &middot; R. Vasquez</div>
  <div class="sig">Customer acceptance &middot; T. Okafor</div>
</div>
<p class="small" style="margin-top:14pt">Illustrative document created for the FUSION 2026 demonstration.
All parties are fictional.</p>
""" % BASE

# ---------------------------------------------------------------- 4. SERVICE HISTORY
DOCS["installed-asset-service-history.pdf"] = """
<style>%s
.hdr2 { border-bottom:3px double #333; padding-bottom:6pt; margin-bottom:10pt; }
.kv { display:grid; grid-template-columns:130px 1fr; font-size:8.5pt; row-gap:2pt; }
.kv div:nth-child(odd){ color:#555; }
.visit { border:1px solid #ddd; border-left:4px solid #6b7f9e; padding:7pt 10pt; margin-bottom:8pt; }
.visit h3 { margin:0 0 3pt; }
</style>
<div class="hdr2">
  <div style="font-size:12pt;font-weight:700;letter-spacing:1pt">COBALT RIDGE AUTOMATION</div>
  <div class="meta">Installed Base Records &middot; Asset Service History Extract</div>
</div>
<h1>Service history &middot; Sortation Line SR-440</h1>
<div class="kv" style="margin-bottom:12pt">
  <div>Asset ID</div><div>SR-440</div>
  <div>Serial</div><div>CRA-SR440-2113-0087</div>
  <div>Customer</div><div>Northstar Retail Distribution</div>
  <div>Site</div><div>Joliet Distribution Center, Building 2, Outbound</div>
  <div>Commissioned</div><div>14 September 2024</div>
  <div>Warranty status</div><div>Active, expires 14 September 2026</div>
  <div>Baseline</div><div>CR-SR440-3.2 (controls set 2025.11)</div>
  <div>Service visits</div><div>6</div>
  <div>Open findings</div><div>1</div>
  <div>Extract generated</div><div>17 April 2026</div>
</div>

<h2>Visit log</h2>

<div class="visit"><h3>Visit 1 &middot; 22 September 2024 &middot; Commissioning handover</h3>
<p class="meta">Cobalt Ridge &middot; Technician: J. Whitfield</p>
<p>Full commissioning sequence completed and signed. Throughput verified at 11,400 units per hour sustained.
Baseline CR-SR440-3.1 released to site. Customer maintenance team trained on daily checks.</p></div>

<div class="visit"><h3>Visit 2 &middot; 3 March 2025 &middot; Scheduled preventive maintenance</h3>
<p class="meta">Cobalt Ridge &middot; Technician: J. Whitfield</p>
<p>Schedule B tasks completed. Belt tension adjusted on infeed. No findings.</p></div>

<div class="visit"><h3>Visit 3 &middot; 19 September 2025 &middot; Scheduled preventive maintenance</h3>
<p class="meta">Cobalt Ridge &middot; Technician: A. Nakamura</p>
<p>Schedule B tasks completed. Two divert photo-eyes replaced under consumables. Controls set updated to 2025.11
and baseline reissued as CR-SR440-3.2. Customer signed acceptance of the revised baseline.</p></div>

<div class="visit"><h3>Visit 4 &middot; 18 January 2026 &middot; Scheduled preventive maintenance</h3>
<p class="meta">Cobalt Ridge &middot; Technician: A. Nakamura</p>
<p>Schedule B tasks completed. <b>Finding recorded and left open:</b> main sort drive case temperature measured
64C under sustained load, against a nominal expectation of 52C to 58C for this duty. No fault codes present and
no line stop observed during the visit. Advised site to monitor and to check bay ventilation. Recommended a
follow-up thermal survey within ninety days.</p>
<p class="meta">Finding reference: SF-2026-0114. Status at extract: OPEN. No follow-up visit recorded.</p></div>

<div class="visit"><h3>Visit 5 &middot; 6 April 2026 &middot; Third-party work, recorded from customer notification</h3>
<p class="meta">Not a Cobalt Ridge visit &middot; Recorded 9 April 2026 from customer email</p>
<p>Site advised that a contract maintenance provider replaced the main sort drive and adjusted controls
parameters. No prior authorization request was received by Cobalt Ridge for this work. Copy of the third-party
work order requested from the customer on 9 April. Not received as of this extract.</p>
<p class="meta">Note added by A. Nakamura: this work was not performed under the service agreement and the
installed component has not been qualified against the baseline.</p></div>

<div class="visit"><h3>Visit 6 &middot; 11 April 2026 &middot; Remote evidence review</h3>
<p class="meta">Cobalt Ridge &middot; Reliability and Controls Engineer: M. Alvarez</p>
<p>Remote pull of controls configuration against released baseline CR-SR440-3.2. Three parameters differ from
the released values. Differences correspond to the period around 6 April. No approval record exists for the
changes. Flagged to Aftermarket Operations for warranty review.</p></div>

<h2>Summary</h2>
<table>
<tr><th>Category</th><th>Count</th><th>Comment</th></tr>
<tr><td>Scheduled maintenance visits</td><td>3</td><td>All Schedule B tasks completed on interval</td></tr>
<tr><td>Corrective visits by Cobalt Ridge</td><td>0</td><td>No covered repair performed to date</td></tr>
<tr><td>Third-party interventions recorded</td><td>1</td><td>Drive replacement, 6 April 2026, unauthorized</td></tr>
<tr><td>Open findings</td><td>1</td><td>SF-2026-0114, elevated drive temperature, January 2026</td></tr>
</table>
<p class="small" style="margin-top:14pt">Illustrative document created for the FUSION 2026 demonstration. Cobalt
Ridge Automation and Northstar Retail Distribution are fictional.</p>
""" % BASE

# ---------------------------------------------------------------- 5. RETURNED PART INSPECTION
DOCS["returned-part-inspection.pdf"] = """
<style>%s
.lab { background:#f4f6f4; border:1px solid #c9d2c9; padding:8pt 11pt; margin-bottom:11pt; }
.lab .t { font-size:12pt; font-weight:700; }
.stamp { display:inline-block; border:2px solid #a33; color:#a33; padding:3pt 9pt; font-weight:700;
  transform:rotate(-3deg); font-size:11pt; letter-spacing:1pt; }
</style>
<div class="lab">
  <div class="t">COBALT RIDGE AUTOMATION &middot; COMPONENT ANALYSIS LABORATORY</div>
  <div class="meta">Milwaukee, WI &middot; Report CAL-2026-0731 &middot; Issued 21 April 2026</div>
</div>

<h1>Returned Component Inspection Report</h1>
<p class="meta">Preliminary &middot; Analysis in progress &middot; Not for external distribution</p>

<h2>1. Sample identification</h2>
<table>
<tr><th style="width:30%%">Field</th><th>Value</th></tr>
<tr><td>Component</td><td>Drive assembly, CR-DRV-4410-B (Revision B)</td></tr>
<tr><td>Serial</td><td>4410B-22781</td></tr>
<tr><td>Removed from</td><td>Sortation Line SR-440, Northstar Retail Distribution, Joliet DC</td></tr>
<tr><td>Removed by</td><td>Meridian Industrial Services (third party), 6 April 2026</td></tr>
<tr><td>Received at laboratory</td><td>16 April 2026, RMA CRA-RMA-2026-0442</td></tr>
<tr><td>Related case</td><td>WR-2026-0417</td></tr>
<tr><td>Sample position in study</td><td>Unit 4 of 4</td></tr>
<tr><td>Disposition</td><td><span class="stamp">HOLD</span></td></tr>
</table>

<h2>2. Purpose</h2>
<p>This unit is the fourth returned drive assembly of the same revision examined under the open review of thermal
failures in the SR-440 drive family. The purpose of this inspection is to determine whether a common failure
mechanism is present across the returned population, and whether that mechanism is attributable to component design,
manufacture, supplier variation, installation, or operating conditions.</p>

<h2>3. Visual examination</h2>
<p>Heat discoloration is present on the heatsink face adjacent to the power stage, extending approximately 40mm from
the centerline in a broadly symmetric pattern. Discoloration ranges from straw to light blue, consistent with
sustained elevated temperature rather than a single thermal excursion.</p>
<p>No mechanical damage, impact marks, or evidence of liquid ingress. Mounting face is flat and shows normal
witness marks. Connector housings are intact and correctly seated. Conformal coating is intact except in the
discolored region, where it shows slight yellowing.</p>

<h2>4. Measurements</h2>
<table>
<tr><th>Measurement</th><th>This unit</th><th>Units 1-3 (range)</th><th>New reference</th></tr>
<tr><td>Thermal interface thickness, mean (mm)</td><td>0.31</td><td>0.28 - 0.34</td><td>0.25 nominal</td></tr>
<tr><td>Heatsink flatness deviation (mm)</td><td>0.04</td><td>0.03 - 0.06</td><td>&lt; 0.08 spec</td></tr>
<tr><td>Power stage junction resistance (mOhm)</td><td>4.7</td><td>4.4 - 5.1</td><td>3.9 typical</td></tr>
<tr><td>Fan assembly free-run (rpm)</td><td>3,180</td><td>3,110 - 3,240</td><td>3,200 nominal</td></tr>
</table>
<p>Thermal interface thickness on all four returned units sits above the nominal value. The deviation is within the
supplier's stated tolerance band but clusters at the upper end across every unit examined.</p>

<h3>Figure 1 &middot; Power stage junction resistance by unit (mOhm)</h3>
<div style="border:1px solid #ccc;padding:10pt 12pt;margin:6pt 0 10pt;background:#fcfcfc">
  <div style="display:flex;align-items:flex-end;gap:16pt;height:96px;border-bottom:1px solid #666;
              border-left:1px solid #666;padding:0 10pt 0 6pt">
    <div style="text-align:center"><div style="background:#8fa8c4;width:34px;height:62px"></div>
      <div style="font-size:7pt;margin-top:2pt">Unit 1<br>4.4</div></div>
    <div style="text-align:center"><div style="background:#8fa8c4;width:34px;height:68px"></div>
      <div style="font-size:7pt;margin-top:2pt">Unit 2<br>4.8</div></div>
    <div style="text-align:center"><div style="background:#8fa8c4;width:34px;height:72px"></div>
      <div style="font-size:7pt;margin-top:2pt">Unit 3<br>5.1</div></div>
    <div style="text-align:center"><div style="background:#c4907f;width:34px;height:66px"></div>
      <div style="font-size:7pt;margin-top:2pt">Unit 4<br>4.7</div></div>
    <div style="text-align:center"><div style="background:#b8c4b8;width:34px;height:55px"></div>
      <div style="font-size:7pt;margin-top:2pt">New ref<br>3.9</div></div>
  </div>
  <div style="font-size:7.5pt;color:#666;margin-top:5pt">Rejection limit 6.0 mOhm (not shown). Unit 4 is the
  sample covered by this report. No returned unit exceeds the rejection limit individually.</div>
</div>

<h2>5. Observations</h2>
<ol>
<li>All four returned units show the same discoloration pattern in the same location.</li>
<li>All four show elevated junction resistance relative to a new reference unit, though none exceed the
rejection limit taken individually.</li>
<li>Three of the four units, including this one, came from sites where the recorded ambient in the equipment
aisle exceeded 27C during the reported failure period.</li>
<li>This unit was operated for an undetermined period with the thermal cutback threshold raised above the
released baseline value, per the third-party work order associated with the site. The duration at the elevated
threshold is not established.</li>
</ol>

<div class="note"><b>Analyst comment.</b> The pattern across four units is consistent with a marginal thermal
design or a supplier process variation at the thermal interface, but the sample is small and three of the four
sites share an elevated ambient condition. The evidence does not yet separate a component-attributable cause
from an installation-and-environment cause. A conclusion should not be drawn from this report alone.</div>

<h2>6. Outstanding work</h2>
<ul>
<li>Cross-section of the power stage on units 2 and 4 to examine solder joint condition. Scheduled 28 April.</li>
<li>Supplier lot trace for all four units. Requested from Procurement 17 April, not yet received.</li>
<li>Ambient temperature data for the fourth site over the ninety days preceding failure. Requested from the
customer, not yet received.</li>
<li>Comparison against a control population of units from the same lots still in service.</li>
</ul>

<h2>7. Interim conclusion</h2>
<p>Preliminary. No common failure mechanism is established at this time. The unit is retained on hold pending
completion of Section 6. This report does not support a coverage determination on case WR-2026-0417 in either
direction, and should not be cited as establishing a product defect.</p>

<div style="display:flex;gap:40pt">
  <div class="sig">Analyst &middot; D. Ferreira, Component Analysis Laboratory</div>
  <div class="sig">Reviewed &middot; P. Shah, Product Quality Lead</div>
</div>
<p class="small" style="margin-top:14pt">Illustrative document created for the FUSION 2026 demonstration.</p>
""" % BASE

# ---------------------------------------------------------------- 6. INTAKE EMAIL
DOCS["warranty-claim-intake-email.pdf"] = """
<style>%s
body { font-family:'Helvetica Neue',Arial,sans-serif; }
.mail { border:1px solid #ccc; }
.mailhdr { background:#f3f4f6; padding:9pt 12pt; border-bottom:1px solid #ccc; font-size:8.5pt; }
.mailhdr .row { display:grid; grid-template-columns:62px 1fr; margin-bottom:2pt; }
.mailhdr .row span:first-child { color:#666; }
.mailbody { padding:12pt 14pt; font-size:9.5pt; }
.quoted { border-left:2px solid #bbb; padding-left:10pt; margin-top:10pt; color:#555; font-size:9pt; }
.attach { border-top:1px solid #ddd; padding:7pt 12pt; font-size:8pt; color:#444; background:#fafafa; }
</style>
<h1 style="margin-bottom:8pt">Warranty claim intake &middot; inbound message</h1>
<p class="meta" style="margin-bottom:12pt">Captured from the Cobalt Ridge support portal, case WR-2026-0417</p>

<div class="mail">
<div class="mailhdr">
  <div class="row"><span>From</span><span>Tobias Okafor &lt;t.okafor@northstarretail.example&gt;</span></div>
  <div class="row"><span>To</span><span>support@cobaltridge.example</span></div>
  <div class="row"><span>Cc</span><span>Dana Whitfield &lt;d.whitfield@northstarretail.example&gt;</span></div>
  <div class="row"><span>Sent</span><span>Friday, 17 April 2026 06:58 CDT</span></div>
  <div class="row"><span>Subject</span><span>URGENT - SR440 down at Joliet, we are losing the outbound wave</span></div>
</div>
<div class="mailbody">
<p>We need help this morning. The main sort line stopped at about 6:40 and we cannot get it to run.
It faulted out during the peak outbound wave, so we have trailers staged and nothing moving to them.
We are hand sorting what we can but that is maybe fifteen percent of rate and we will start missing
carrier cutoffs by ten o'clock.</p>

<p>Operators say it threw the same overtemp fault we have been seeing on and off, then went into a hard
stop and would not reset. Third reset attempt it faulted again inside two minutes.</p>

<p>This line is under warranty, it went in September 2024. We need somebody on site today. What I need
to know right now is when a technician can be here and whether there is anything my team can safely do
in the meantime to get partial flow back.</p>

<p>For context on our exposure, a full day down at this building is on the order of two hundred seventy
five thousand dollars in expedite and penalty costs, and this is our heaviest week of the month.</p>

<p>Dana is copied and can approve whatever is needed on our side.</p>

<p>Tobias Okafor<br>
Maintenance Supervisor, Joliet Distribution Center<br>
Northstar Retail Distribution<br>
Direct (815) 555-0193 &middot; Mobile (815) 555-0271</p>

<div class="quoted">
<p><b>From:</b> Tobias Okafor<br><b>Sent:</b> Tuesday, 7 April 2026 16:22 CDT<br>
<b>Subject:</b> FYI - drive work on SR440</p>
<p>Heads up, we had our maintenance contractor swap the main sort drive yesterday. We had been getting
overtemp faults for a couple weeks and your lead time was three weeks which we could not absorb going
into peak. They put in an equivalent unit and got us running. Let me know if you need anything for
your records.</p>
</div>
</div>
<div class="attach">
Attachments (3): &nbsp; SR440_fault_screen_0641.jpg (1.2 MB) &nbsp;&middot;&nbsp;
staged_trailers_0705.jpg (2.8 MB) &nbsp;&middot;&nbsp; NRD_asset_register_extract.pdf (340 KB)
</div>
</div>

<h2>Intake classification</h2>
<table>
<tr><th style="width:32%%">Field</th><th>Recorded value</th></tr>
<tr><td>Case</td><td>WR-2026-0417</td></tr>
<tr><td>Received</td><td>17 April 2026, 06:58 CDT</td></tr>
<tr><td>Channel</td><td>Support portal, email intake</td></tr>
<tr><td>Asset</td><td>Sortation Line SR-440, Joliet DC</td></tr>
<tr><td>Impact tier</td><td>Tier 1, Line Down</td></tr>
<tr><td>Stated exposure</td><td>$275,000 per day, customer's own figure, unverified</td></tr>
<tr><td>Warranty status at intake</td><td>Active, expires 14 September 2026</td></tr>
<tr><td>Prior related correspondence</td><td>7 April 2026, third-party drive replacement notified after the fact</td></tr>
</table>
<p class="small" style="margin-top:14pt">Illustrative document created for the FUSION 2026 demonstration. All names,
addresses, and domains are fictional.</p>
""" % BASE

# ------------------------------------------- 7. COMBINED PACKET (multi-doc stack, no separators)
DOCS["claim-evidence-packet-combined.pdf"] = (
    """<style>%s .pb { page-break-before: always; }</style>""" % BASE
    + """
<style>
.cover { border:1px solid #999; padding:12pt 14pt; margin-bottom:10pt; }
</style>
<div class="cover">
  <div style="font-size:12pt;font-weight:700;letter-spacing:1pt">NORTHSTAR RETAIL DISTRIBUTION</div>
  <div class="meta">Submitted to Cobalt Ridge Automation in support of warranty claim WR-2026-0417</div>
</div>
<h1>Claim evidence submission</h1>
<p class="meta">Submitted 20 April 2026 by D. Whitfield, Director of Facilities &middot; Joliet Distribution Center</p>
<p>Per your request of 17 April, attached is the documentation we hold covering the SR-440 sort line and the
work performed on it. This is everything our maintenance team was able to locate. Please advise if anything
further is needed.</p>
<p class="small">This file contains several separate documents submitted together and was not split before
sending.</p>
"""
    + '<div class="pb"></div>'
    + DOCS["warranty-claim-intake-email.pdf"].split("</style>", 1)[1]
    + '<div class="pb"></div>'
    + DOCS["third-party-service-report.pdf"].split("</style>", 1)[1]
    + '<div class="pb"></div>'
    + DOCS["installed-asset-service-history.pdf"].split("</style>", 1)[1]
)


def build():
    made = []
    for name, html in DOCS.items():
        stem = name.replace(".pdf", "")
        hp = f"/tmp/_ixp_{stem}.html"
        with open(hp, "w") as f:
            f.write("<!doctype html><meta charset='utf-8'>" + html)
        out = os.path.join(OUT, name)
        subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
                        f"--print-to-pdf={out}", "--virtual-time-budget=3000", f"file://{hp}"],
                       capture_output=True, timeout=90)
        made.append((name, os.path.getsize(out) if os.path.exists(out) else 0))
    return made

if __name__ == "__main__":
    for n, s in build():
        print(f"{s:>9,} bytes  {n}")
