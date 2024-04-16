export const BaseForm=({
    children,
    className,
}:{
    children:React.ReactNode;
    className?:string;
}) =>(
    <section className={`flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200 ${className}`}>
        {children}

    </section>
)