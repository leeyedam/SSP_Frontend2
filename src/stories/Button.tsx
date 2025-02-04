import './button.css'

interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean
    /**
     * What background color to use
     */
    backgroundColor?: string
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large'
    /**
     * Button contents
     */
    label: string
    /**
     * Optional click handler
     */
    onClickButton: any
}
/**
 * Primary UI component for user interaction
 */
const Button = ({
    primary = false,
    size = 'medium',
    backgroundColor,
    label,
    onClickButton,
    ...props
}: ButtonProps) => {
    const mode = primary
        ? 'storybook-button--primary'
        : 'storybook-button--secondary'
    return (
        <button
            type="button"
            className={[
                'storybook-button',
                `storybook-button--${size}`,
                mode,
            ].join(' ')}
            style={{ backgroundColor }}
            {...props}
            onClick={onClickButton}
        >
            {label}
        </button>
    )
}

Button.defaultProps = {
    primary: false,
    size: 'medium',
    backgroundColor: 'transparent',
}

export default Button
