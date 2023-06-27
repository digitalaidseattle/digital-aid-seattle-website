export default function PageSection({ children, style }) {
  return (
    <div className="flex-col px-6 py-20 md:flex lg:px-8" style={style}>
      {children}
    </div>
  )
}
