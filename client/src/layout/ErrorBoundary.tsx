import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
    state = { hasError: false };

    static getDerivedStateFromError(_error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return this.props.fallback;
        } else {
            return this.props.children;
        }
    }
}
