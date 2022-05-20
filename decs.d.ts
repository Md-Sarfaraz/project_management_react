
declare module '@material-tailwind/react/Button' {

    const Button: React.FC<{
        color: string,
        buttonType: string,
        size?: string,
        rounded?: boolean,
        block?: boolean,
        iconOnly?: boolean,
        ripple?: string
    }>
    export default Button
}