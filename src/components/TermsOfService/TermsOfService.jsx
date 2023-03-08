import { useState } from "react";
import style from "./TermsOfService.module.css";

function TermsOfService({ handleSetTerms }) {
  const [agree, setAgree] = useState(false);

  function handleSubmit() {
    if (agree) handleSetTerms("true");
  }

  function handleRadio(e) {
    setAgree(true);
  }
  return (
    <>
      <div className={style.box}>
        <h2 className={style.h2}>Terms of Service Agreement</h2>
        <p>
          Welcome to the Utopics Visualizer! <br /> <br />
          Please read these terms carefully before using the Utopics Visualizer
          ("the Application") operated by Utopics ("us", "we", or "our"). <br />
          <br /> These terms govern your use of the Application, including all
          videos, images, and other content available through the Application.
          By using the Application, you agree to be bound by these terms. If you
          do not agree to these terms, you may not use the Application. <br />{" "}
          <br /> 1. License <br />
          <br /> We grant you a limited, non
          <br />
          -exclusive, non-transferable, revocable license to use the Application
          for personal or commercial use, subject to these terms. This license
          does not include any rights to modify, distribute, sell, or use the
          Application or its content for any commercial purpose without our
          prior written consent. <br />
          <br /> 2. Content <br />
          <br /> All videos, images, and other content available through the
          Application are owned by their respective owners and are protected by
          copyright and other intellectual property laws. You may not use or
          reproduce any content from the Application without our prior written
          consent. <br />
          <br /> 3. Use of the Application <br />
          <br /> You may use the Application only for lawful purposes and in
          accordance with these terms. You agree not to use the Application:{" "}
          <br />- In any way that violates any applicable federal, state, local,
          or international law or regulation <br />
          <br />- For the purpose of exploiting, harming, or attempting to
          exploit or harm minors in any way by exposing them to inappropriate
          content or otherwise <br />
          <br />- To transmit, or procure the sending of, any advertising or
          promotional material, including any "junk mail," "chain letter,"
          "spam," or any other similar solicitation <br />
          <br />- To impersonate or attempt to impersonate Utopics, a Utopics
          employee, another user, or any other person or entity <br />
          <br />- To engage in any other conduct that restricts or inhibits
          anyone's use or enjoyment of the Application, or which, as determined
          by us, may harm Utopics or users of the Application or expose them to
          liability <br />
          <br /> 4. Termination <br />
          <br /> We may terminate or suspend your access to the Application
          immediately, without prior notice or liability, for any reason
          whatsoever, including without limitation if you breach these terms.
          Upon termination, your right to use the Application will immediately
          cease.
          <br />
          <br />
          5. Disclaimer of Warranties <br />
          <br />
          The Application is provided on an "as is" and "as available" basis. We
          make no representations or warranties of any kind, express or implied,
          as to the operation of the Application or the information, content,
          materials, or products included on the Application. You expressly
          agree that your use of the Application is at your sole risk. <br />
          <br /> 6. Limitation of Liability <br />
          <br />
          In no event shall Utopics, its affiliates, or their respective
          directors, officers, employees Limitation of Liability By using the
          “Utopics Visualizer”, you agree to the following limitation of
          liability: <br />
          <br />
          We shall not be liable for any direct, indirect, incidental,
          consequential, special, or exemplary damages, including but not
          limited to damages for loss of profits, goodwill, use, data, or other
          intangible losses (even if we have been advised of the possibility of
          such damages), resulting from: <br />
          <br />- Your use or inability to use the Application;
          <br /> <br /> - Any modification, suspension, or discontinuation of
          the Application; <br />
          <br />- Any interruption, delay, or other failure in the operation or
          availability of the Application; <br /> <br /> - Any unauthorized
          access to or alteration of your transmissions or data; <br /> <br />-
          Any third-party content, websites, or services that may be linked to
          or from the Application; or <br /> <br />- Any other matter relating
          to the Application. <br />
          <br /> In no event shall our total liability to you for all damages,
          losses, and causes of action arising out of or relating to the
          Application, whether in contract, tort (including negligence), or
          otherwise, exceed the amount paid by you, if any, for accessing the
          Application. <br />
          <br />
          Some jurisdictions do not allow the exclusion of certain warranties or
          the limitation or exclusion of liability for incidental or
          consequential damages. Accordingly, some of the above limitations may
          not apply to you. <br />
          <br />
          You acknowledge and agree that we have made the Application available
          to you in reliance upon the limitations of liability and disclaimers
          of warranty and damages set forth herein, and that the same form an
          essential basis of the agreement between you and us. You agree that
          the limitations and exclusions of liability and disclaimers specified
          in this Agreement will survive and apply even if found to have failed
          their essential purpose.
        </p>
      </div>
      <div className={style.submit} onChange={handleRadio}>
        <input type="radio" value="true" name="agreement" /> I have read the
        terms
        <button onClick={handleSubmit}>I Agree</button>
      </div>
    </>
  );
}

export default TermsOfService;
