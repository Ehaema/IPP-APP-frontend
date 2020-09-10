import React, {Component} from "react"
import {StyleSheet, View, Modal} from "react-native"
import {Layout, Text, Divider, Button, Input, Card, CheckBox} from '@ui-kitten/components';


export var Auth = (function () {
    return class Auth extends Component {
        constructor(props) {
            super(props);
            this.mounted = false;
            this.state = {
                username: "",
                password: "",
                remember: false
            }
        }

        componentDidMount() {
            this.mounted = true;
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        render() {
            return (
                <Modal
                    visible={true}>
                    <Layout
                        style={styles.wrapper}
                        level="1">
                        <Card
                            header={
                                () => <Text
                                    category='h3'
                                    style={styles.title}>
                                    用户登录
                                </Text>}
                            footer={
                                () => <Layout
                                    style={styles.formRow}>
                                    <Button>登录</Button>
                                </Layout>}
                            style={styles.card}>
                            <Layout
                                style={styles.formRow}>
                                <Input
                                    label={
                                        <Text category="label">
                                            用户名
                                        </Text>}
                                        value={this.state.username}
                                        onChange={(next) => this.setState({username: next})}/>
                            </Layout>
                            <Layout
                                style={styles.formRow}>
                                <Input
                                    secureTextEntry={true}
                                    label={<Text category="label">
                                        密码
                                    </Text>}
                                    value={this.state.password}
                                    onChange={(next) => this.setState({password: next})}/>
                            </Layout>
                            <Layout
                                style={styles.formRow}>
                                <CheckBox
                                checked={this.state.remember}
                                onChange={(next) => this.setState({remember: next})}
                                >
                                    记住我
                                </CheckBox>
                            </Layout>
                        </Card>
                    </Layout>
                </Modal>
            );
        }
    }
})();

const styles = StyleSheet.create({
    wrapper: {
        height: "100%",
        paddingTop: 60,
    },
    title: {
        paddingTop: 25,
        paddingBottom: 15
    },
    card: {
        paddingLeft: 5,
        paddingRight: 5
    },
    formRow: {
        paddingTop: 10,
        paddingBottom: 10
    }
})

export default Auth;
