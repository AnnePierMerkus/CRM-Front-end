import Column from "@/components/general/Column/Column";
import Card from "@/components/general/Card/Card";
import Row from "@/components/general/Row/Row";

export default function Page() {
    return <Row>
        <Column size="1/2">
            <Card>
                Test 1
            </Card>
        </Column>
        <Column size="1/2">
            <Card>
                Test 2
            </Card>
        </Column>
        <Column size={"1/4"}>
            <Card>
                Test 3
            </Card>
        </Column>
        <Column size={"3/4"}>
            <Card>
                Test 4
            </Card>
        </Column>
        <Column size={"1/3"}>
            <Card>
                Test 5
            </Card>
        </Column>
        <Column size={"2/3"}>
            <Card>
                Test 6
            </Card>
        </Column>
        <Column size={"1/1"}>
            <Card>
                Test 7
            </Card>
        </Column>
    </Row>
}