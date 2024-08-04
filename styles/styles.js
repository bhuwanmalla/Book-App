import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f0f0f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: '#ff6347',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 14,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    passwordContainer: {
        position: 'relative',
        marginVertical: 10,
    },
    passwordInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 14,
        paddingRight: 50,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    eyeButton: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    button: {
        backgroundColor: '#ff6347',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    createText: {
        color: '#ff6347',
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
    },
    loginText: {
        color: '#ff6347',
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
    },
});

export default styles;
