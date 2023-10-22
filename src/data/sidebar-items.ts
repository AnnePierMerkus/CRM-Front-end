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
            {title: 'Employees', href: '/dashboard/employees'},
            {title: 'Customers', href: '/dashboard/customers'}
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
            {title: 'Message types', href: '/dashboard/massage-types'},
            {title: 'Booking history', href: '/dashboard/booking-history'},
            {title: 'Roles and permissions', href: '/dashboard/roles'}
        ]
    }
]


export default sidebarItems;