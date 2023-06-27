export default function PageSection({ children, style }) {
  return (
    <div className="flex flex-col px-6 py-20 lg:px-8" style={style}>
      {children}
    </div>
  )
}
