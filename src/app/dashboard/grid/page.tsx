'use client';

import Column from "@/components/general/Column/Column";
import Card from "@/components/general/Card/Card";
import Row from "@/components/general/Row/Row";

export default function Page() {
    return <Row>
        <Column size="1/1">
            <Card>
                Richard Ringia
            </Card>
        </Column>
        <Column size="1/4">
            <Card>
                Address
            </Card>
        </Column>
        <Column size={"1/4"}>
            <Card>
                Salary
            </Card>
        </Column>
        <Column size={"1/4"}>
            <Card>
                Bookings
            </Card>
        </Column>
        <Column size={"1/4"}>
            <Card>
                Test 5
            </Card>
        </Column>
    </Row>
}