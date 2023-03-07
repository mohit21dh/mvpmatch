import { type FC, type ReactNode } from 'react';
import {
  Accordion as ReactAccessibleAccordion,
  AccordionItem as ReactAccessibleAccordionItem,
  AccordionItemHeading as ReactAccessibleAccordionHeading,
  AccordionItemButton as ReactAccessibleAccordionItemButton,
  AccordionItemPanel as ReactAccessibleAccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

export const Accordion: FC<{
  items: Array<{ heading: ReactNode; content: ReactNode; id: string }>;
  preExpandedIds?: string[];
}> = ({ items, preExpandedIds = [] }) => {
  return (
    <ReactAccessibleAccordion
      allowZeroExpanded
      preExpanded={preExpandedIds}
      className='border-none'
    >
      {items.map(({ heading, content, id }) => (
        <ReactAccessibleAccordionItem key={id} uuid={id}>
          <ReactAccessibleAccordionHeading>
            <ReactAccessibleAccordionItemButton className='h-20 flex items-center bg-white rounded-xl p-4'>
              {heading}
            </ReactAccessibleAccordionItemButton>
          </ReactAccessibleAccordionHeading>
          <ReactAccessibleAccordionItemPanel className='overflow-scroll mt-6'>
            {content}
          </ReactAccessibleAccordionItemPanel>
        </ReactAccessibleAccordionItem>
      ))}
    </ReactAccessibleAccordion>
  );
};
