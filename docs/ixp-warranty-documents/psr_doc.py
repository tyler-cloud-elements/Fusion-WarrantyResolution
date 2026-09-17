# The parts substitution form, in the house style of the rest of the set.
#
# It is the document the Parts substitution review lane exists to read. Filed
# retroactively, which is the point: clause 3.2 wants qualification before the
# component goes in, and this one is dated after both the installation and the
# failure. Section F is left blank because that determination is the decision
# the lane is being asked for.

DOC = """
<style>%s
.hdr { display:flex; justify-content:space-between; align-items:flex-start; }
.brand { font-size:13pt; font-weight:700; letter-spacing:2pt; }
.formno { text-align:right; font-size:8pt; color:#555; }
.notice { border:1.5px solid #222; background:#f4f4f2; padding:6pt 9pt; margin:8pt 0 10pt; font-size:8.3pt; }
.sec { background:#222; color:#fff; font-size:8.5pt; font-weight:700; letter-spacing:0.6pt;
       padding:3pt 7pt; margin:14pt 0 0; }
.fields { display:grid; grid-template-columns:1fr 1fr; border:1px solid #bbb; border-top:none; }
.fields.three { grid-template-columns:1fr 1fr 1fr; }
.f { border-right:1px solid #ddd; border-bottom:1px solid #ddd; padding:3pt 7pt 4pt; }
.f:last-child { border-right:none; }
.f .l { font-size:6.8pt; letter-spacing:0.5pt; text-transform:uppercase; color:#777; display:block; }
.f .v { font-size:9pt; }
.f .v.blank { color:#bbb; }
.cbx { display:grid; grid-template-columns:1fr 1fr; gap:3pt 14pt; font-size:8.5pt;
       border:1px solid #bbb; border-top:none; padding:7pt 9pt; }
.cb { display:inline-block; width:9pt; height:9pt; border:1px solid #444; margin-right:5pt;
      text-align:center; line-height:8.5pt; font-size:8pt; font-weight:700; vertical-align:-1pt; }
.wrap { border:1px solid #bbb; border-top:none; padding:7pt 9pt; }
.wrap table { margin:0; }
.ln { border-bottom:1px solid #999; height:13pt; margin-top:9pt; }
.sigrow { display:grid; grid-template-columns:2fr 1fr; gap:0 22pt; margin-top:4pt; }
.sigl { font-size:6.8pt; letter-spacing:0.5pt; text-transform:uppercase; color:#777; padding-top:2pt; }
.pb { page-break-before: always; }
/* A section header stranded at the foot of a page, or a field block split down
   the middle, reads as a printing fault rather than a form. */
.sec { break-after: avoid; page-break-after: avoid; }
.fields, .cbx, .wrap, .notice { break-inside: avoid; page-break-inside: avoid; }
</style>

<div class="hdr">
  <div>
    <div class="brand">COBALT RIDGE</div>
    <div class="meta">AUTOMATION &middot; Field Service Engineering</div>
  </div>
  <div class="formno">
    Form CR-SVC-PSR-0114<br>Revision 4 &middot; Effective 1 February 2026<br>
    Retention: life of asset + 7 years
  </div>
</div>
<div class="rule"></div>
<h1>Parts Substitution Approval Request</h1>
<p class="meta">Required for any drive, motor, gearbox, controller, or safety device not listed on the
Approved Parts List for the applicable baseline revision.</p>

<div class="notice">
  <b>Read before completing.</b> Clause 3.2 qualifies a substitute component only where Cobalt Ridge Engineering
  issued written qualification <b>before the component was placed in service</b>. A supplier calling a component
  &ldquo;equivalent&rdquo; or &ldquo;form-fit-function&rdquo; does not make it an approved part. A form submitted
  after installation records the substitution for review; it does not qualify the component retroactively.
</div>

<div class="sec">SECTION A &nbsp;&middot;&nbsp; REQUEST AND ASSET</div>
<div class="fields three">
  <div class="f"><span class="l">Request number</span><span class="v">PSR-2026-0338</span></div>
  <div class="f"><span class="l">Date of this request</span><span class="v">20 April 2026</span></div>
  <div class="f"><span class="l">Related warranty case</span><span class="v">WR-2026-0417</span></div>
</div>
<div class="fields three">
  <div class="f"><span class="l">Customer</span><span class="v">Northstar Retail Distribution</span></div>
  <div class="f"><span class="l">Site</span><span class="v">Joliet DC &middot; Line 3 / Induct</span></div>
  <div class="f"><span class="l">Asset serial</span><span class="v">CRA-SR440-2113-0087</span></div>
</div>
<div class="fields three">
  <div class="f"><span class="l">Equipment</span><span class="v">Sortation Line SR-440</span></div>
  <div class="f"><span class="l">Configuration baseline</span><span class="v">CR-SR440-3.2 (controls set 2025.11)</span></div>
  <div class="f"><span class="l">Requested by</span><span class="v">T. Okafor, Maintenance Supervisor</span></div>
</div>
<div class="fields">
  <div class="f"><span class="l">Submitting party</span><span class="v">Customer &middot; on behalf of Meridian Industrial Services (third party)</span></div>
  <div class="f"><span class="l">Contact</span><span class="v">t.okafor@northstar-rd.example &middot; +1 815 555 0147</span></div>
</div>

<div class="sec">SECTION B &nbsp;&middot;&nbsp; COMPONENT SUBSTITUTED</div>
<div class="wrap">
<table>
  <tr><th style="width:21%%">Position</th><th>Approved component</th><th>Component installed</th></tr>
  <tr>
    <td>Main sort drive</td>
    <td>CR-DRV-4410-B (Rev B)<br><span class="small">s/n 4410B-22781 &middot; on Approved Parts List CR-SR440-3.2</span></td>
    <td>Altek AD-5500-HD<br><span class="small">s/n AD55-91043 &middot; not listed</span></td>
  </tr>
</table>
</div>
<div class="fields three">
  <div class="f"><span class="l">Date placed in service</span><span class="v">6 April 2026</span></div>
  <div class="f"><span class="l">Installed by</span><span class="v">Meridian Industrial Services, W/O MIS-44182</span></div>
  <div class="f"><span class="l">Component cost</span><span class="v">$11,480.00</span></div>
</div>
<div class="fields">
  <div class="f"><span class="l">Reason substitution was made</span><span class="v">OEM unit quoted at three weeks;
    customer unable to hold the line down through peak season.</span></div>
  <div class="f"><span class="l">Prior written qualification on file</span><span class="v">None</span></div>
</div>

<div class="sec">SECTION C &nbsp;&middot;&nbsp; BASIS OF EQUIVALENCE CLAIMED</div>
<div class="cbx">
  <div><span class="cb">&times;</span>Same rated horsepower</div>
  <div><span class="cb">&times;</span>Same supply voltage and phase</div>
  <div><span class="cb">&nbsp;</span>Same frame and mounting pattern</div>
  <div><span class="cb">&nbsp;</span>Same thermal derating curve</div>
  <div><span class="cb">&nbsp;</span>Same control interface and firmware profile</div>
  <div><span class="cb">&nbsp;</span>Same safety certification and category</div>
  <div><span class="cb">&nbsp;</span>Supplier equivalence certificate attached</div>
  <div><span class="cb">&nbsp;</span>OEM test fixture used for commissioning</div>
</div>
<div class="fields">
  <div class="f"><span class="l">Supporting documents attached</span><span class="v">Meridian work order MIS-44182.
    Altek datasheet not supplied.</span></div>
  <div class="f"><span class="l">Supplier equivalence statement</span><span class="v">Verbal, per Meridian lead
    technician. Not provided in writing.</span></div>
</div>

<div class="sec pb">SECTION D &nbsp;&middot;&nbsp; INSTALLATION IMPACT</div>
<div class="wrap">
  <p style="margin-bottom:5pt"><b>Mechanical.</b> Frame and mounting pattern differ from the approved component.
  A 6&nbsp;mm adapter plate was fabricated on site to seat the unit. The assembly fits within the existing guard
  envelope. The unit is not a drop-in replacement.</p>
  <p style="margin-bottom:4pt"><b>Controls.</b> The substitute drive would not hold the released acceleration
  profile. The following parameters were changed from the baseline to keep the line running:</p>
<table>
  <tr><th>Parameter</th><th style="width:14%%">Baseline</th><th style="width:14%%">Set to</th><th>Reason given</th></tr>
  <tr><td>ACCEL_RAMP_MS</td><td>420</td><td>610</td><td>Reduce inrush on start</td></tr>
  <tr><td>CURRENT_LIM_PCT</td><td>115</td><td>135</td><td>Prevent nuisance trip at divert</td></tr>
  <tr><td>THERM_CUTBACK_C</td><td>68</td><td>82</td><td>Substitute unit runs warmer by spec</td></tr>
</table>
  <p class="small" style="margin:0">Run-in performed at operating speed for 90 minutes. Full OEM commissioning
  test sequence was not performed; the OEM test fixture and the current baseline document were not available to
  the installing party.</p>
</div>

<div class="sec">SECTION E &nbsp;&middot;&nbsp; REQUESTER DECLARATION</div>
<div class="wrap">
  <p style="margin-bottom:2pt">I confirm the information above is complete and accurate, that the component
  described was placed in service on the date stated, and that no written qualification for it was held at that
  time.</p>
  <div class="sigrow">
    <div><div class="ln"></div><div class="sigl">Signature &middot; requester</div></div>
    <div><div class="ln"></div><div class="sigl">Date</div></div>
  </div>
  <div class="sigrow">
    <div><div class="ln"></div><div class="sigl">Print name and title</div></div>
    <div><div class="ln"></div><div class="sigl">Company</div></div>
  </div>
</div>

<div class="sec">SECTION F &nbsp;&middot;&nbsp; COBALT RIDGE ENGINEERING DETERMINATION &nbsp;&mdash;&nbsp; DO NOT COMPLETE</div>
<div class="cbx" style="grid-template-columns:1fr 1fr 1fr">
  <div><span class="cb">&nbsp;</span>Qualified as equivalent</div>
  <div><span class="cb">&nbsp;</span>Qualified with conditions</div>
  <div><span class="cb">&nbsp;</span>Not qualified</div>
</div>
<div class="fields three">
  <div class="f"><span class="l">Determination date</span><span class="v blank">&nbsp;</span></div>
  <div class="f"><span class="l">Effective from</span><span class="v blank">&nbsp;</span></div>
  <div class="f"><span class="l">Baseline revision issued</span><span class="v blank">&nbsp;</span></div>
</div>
<div class="wrap">
  <span class="l" style="font-size:6.8pt;letter-spacing:0.5pt;text-transform:uppercase;color:#777">
    Conditions, required testing, or reason for refusal</span>
  <div class="ln"></div><div class="ln"></div><div class="ln"></div>
  <div class="sigrow" style="margin-top:10pt">
    <div><div class="ln"></div><div class="sigl">Signature &middot; Cobalt Ridge Engineering</div></div>
    <div><div class="ln"></div><div class="sigl">Date</div></div>
  </div>
</div>

<p class="small" style="margin-top:12pt">Route the completed form to warranty.engineering@cobaltridge.example.
A determination under Section F does not of itself reinstate coverage on a claim already open; coverage is
assessed against clauses 3.1, 3.2, and 3.3 as at the date the component was placed in service.</p>
"""
