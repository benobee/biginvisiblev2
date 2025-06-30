interface DataPointProps {
  value: string;
  label: string;
  className?: string;
}

const DataPoint = ({ value, label, className }: DataPointProps) => {
  return (
    <div className={`reveal-text text-center ${className || ''}`}>
      <div className="text-5xl font-bold text-accent mb-3">{value}</div>
      <div className="text-sm uppercase tracking-wider text-dark">{label}</div>
    </div>
  );
};

export default DataPoint;