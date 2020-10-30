import React, {Component} from "react"
import {StyleSheet, View, Modal, Alert} from "react-native"
import {Layout, Text, Divider, Button, Input, Card, CheckBox} from '@ui-kitten/components';


export var Auth = (function () {
    return class Auth extends Component {
        constructor(props) {
            super(props);
            this.mounted = false;
            this.state = {
                username: "",
                password: "",
                remember: false,
                login: false,
                newModel: null
            }
        }

        componentDidMount() {
            this.mounted = true;
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        checkLogin() {
            if (this.state.username === "r") {
                this.setState({login : true});
                return this.receiver();
            }
            else if (this.state.username === "s") {
                this.setState({login : true});
                return this.sender();
            }
            else return Alert.alert('登录失败！');
        }

        receiver() {
            return (
                <Layout
                    style={styles.userWindow}
                    level="1">
                    <Card
                        header={
                            () => <Text
                                category='h3'
                                style={styles.title}>
                                收件者
                            </Text>}
                        footer={
                            () => <Layout
                                style={styles.formRow}>
                                <Button onPress={() => this.checkLogin() }>
                                    登录
                                </Button>
                            </Layout>}
                        style={styles.card}>
                    </Card>
                </Layout>
            );
        }

        sender() {
            return (
                <Layout
                    style={styles.userWindow}
                    level="1">
                    <Card
                        header={
                            () => <Text
                                category='h3'
                                style={styles.title}>
                                寄件者
                            </Text>}
                        footer={
                            () => <Layout
                                style={styles.formRow}>
                                <Button onPress={() => this.checkLogin() }>
                                    登录
                                </Button>
                            </Layout>}
                        style={styles.card}>
                    </Card>
                </Layout>
            );
        }

        render() {
            return ( !this.state.login?
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
                                    <Button onPress={() => this.setState({newModel: this.checkLogin()})}>
                                        登录
                                    </Button>
                                </Layout>}
                            style={styles.card}>
                            <Layout
                                style={styles.formRow}>
                                <Input
                                    label={
                                        <Text category="label">
                                            用户名
                                        </Text>
                                    }
                                    value={this.state.username}
                                    onChangeText={(text) => this.setState({username: text})}
                                />
                            </Layout>
                            <Layout
                                style={styles.formRow}>
                                <Input
                                    secureTextEntry={true}
                                    label={
                                        <Text category="label">
                                            密码
                                        </Text>
                                    }
                                    value={this.state.password}
                                    onChangeText={(text) => this.setState({password: text})}
                                />
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
                </Modal> : this.state.newModel
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
    },
    userWindow: {
        height: "40%",
        top: "60%",
    }
})

export default Auth;
