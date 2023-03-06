import { FC, ReactNode } from 'react';
import {
    Accordion as ReactAccessibleAccordion,
    AccordionItem as ReactAccessibleAccordionItem,
    AccordionItemHeading as ReactAccessibleAccordionHeading,
    AccordionItemButton as ReactAccessibleAccordionItemButton,
    AccordionItemPanel as ReactAccessibleAccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

export const Accordion: FC<{
    items: Array<{ heading: ReactNode, content: ReactNode, id: string }>,
    preExpandedIds?: Array<string>
}> = ({
    items,
    preExpandedIds = []
}) => {
        return (
            <ReactAccessibleAccordion allowZeroExpanded preExpanded={preExpandedIds}>
                {items.map(({ heading, content, id }) => (<ReactAccessibleAccordionItem key={id} uuid={id}>
                    <ReactAccessibleAccordionHeading className='border-none'>
                        <ReactAccessibleAccordionItemButton style={{
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "1rem",
                            padding: "1rem"
                        }}>
                            {heading}
                        </ReactAccessibleAccordionItemButton>
                    </ReactAccessibleAccordionHeading>
                    <ReactAccessibleAccordionItemPanel>
                        {content}
                    </ReactAccessibleAccordionItemPanel>
                </ReactAccessibleAccordionItem>))}

            </ReactAccessibleAccordion>
        );
    }