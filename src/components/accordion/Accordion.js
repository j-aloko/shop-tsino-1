import React from 'react';

import { MuiAccordion, AccordionDetails, AccordionSummary } from '../mui-components/MuiComponents';
import { ExpandMoreIcon } from '../mui-icons/muiIcons';

function Accordion({ accordionTitleComponent, accordionDetailsComponent, accordionStyle, accordionSummaryStyle }) {
  return (
    <MuiAccordion sx={accordionStyle}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" sx={accordionSummaryStyle}>
        {accordionTitleComponent}
      </AccordionSummary>
      <AccordionDetails>{accordionDetailsComponent}</AccordionDetails>
    </MuiAccordion>
  );
}

export default Accordion;
