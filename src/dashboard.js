import React from  'react';
import {useHistory} from "react-router";
import {Row,Col,Button} from 'antd';

const Dashboard = () => {

    const history = useHistory()
    const onUser = () => {
        history.push(`/users`);
    }

    return(
        <>
            <Row style={{marginTop: 200}}>
                <Col span={8} />
                <Col span={8} style={{textAlign: "center"}}>
                    <h1>Your Login Is SuccessFully</h1>
                    <Button type="primary" onClick={onUser}>Show data</Button>
                </Col>
                <Col span={8} />
            </Row>
        </>
    )
}

export default Dashboard;