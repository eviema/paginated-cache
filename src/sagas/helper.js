// helper to preprocess card data
export default (cards) => {
    return cards.map(card => {
        card = {...card.coreData, ...card.serviceData}

        return {
            state: card.state,
            number: card.number,
            application: card.application,
            assignee: card.assignee,
            shortDescription: card.shortDescription,
            made_sla: card.made_sla,
            upon_reject: card.upon_reject,
            opened_by: card.opened_by,
            priority: card.priority,
            activity_due: card.activity_due,
            approval: card.approval
        };
    });
}