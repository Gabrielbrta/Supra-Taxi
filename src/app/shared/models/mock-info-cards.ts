import { InfoCardsData } from "./dashboard/InfoCardsData";

export const INFO_CARDS: InfoCardsData =  {
    data: [
        {
            title: '1.284',
            description: 'Motoristas Ativos',
            stats: '12',
            icon: 'LucideCar',
            typeIconStatus: 'data',
            statsIcon: 'LucideClipboardCheck'
        },
        {
            title: '318',
            description: 'Associados Ativos',
            stats: '3',
            icon: 'LucideUsers',
            typeIconStatus: 'data',
            statsIcon: 'LucideClipboardCheck'
        },
        {
            title: '2.741',
            description: 'Vistorias Registradas',
            stats: '128',
            icon: 'LucideClipboardCheck',
            typeIconStatus: 'approved',
            statsIcon: 'LucideClipboardCheck'
        },
        {
            title: '47',
            description: 'Documentos Pendentes',
            stats: '9',
            icon: 'LucideTriangleAlert',
            typeIconStatus: 'denied',
            statsIcon: 'LucideClipboardCheck'
        }
    ]
}