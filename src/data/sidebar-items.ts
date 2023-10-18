interface SidebarGroup {
    title: string,
    children: SidebarItem[]
}

interface SidebarItem {
    title: string,
    href: string
}

const sidebarItems: SidebarGroup[] = [
    {
        title: 'Home',
        children: [
            {title: 'Dashboard', href: '/dashboard'},
            {title: 'Bookings', href: '/dashboard/bookings'},
            {title: 'Products', href: '/dashboard/products'}
        ]
    },
    {
        title: 'Example components',
        children: [
            {title: 'Grid and Cards', href: '/dashboard/grid'},
        ]
    },
    {
        title: 'Settings',
        children: [
            {title: 'Message types', href: '/dashboard/types'},
            {title: 'Workers', href: '/dashboard/workers'}
        ]
    }
]


export default sidebarItems;