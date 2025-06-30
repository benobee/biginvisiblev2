
interface TimelineStepProps {
  phase: number;
  title: string;
  description: string;
  deliverables: string[];
}

const TimelineStep = ({ phase, title, description, deliverables }: TimelineStepProps) => {
  return (
    <div className="relative pl-8 sm:pl-32 py-6 group">
      {/* Vertical line (border) */}
      <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-accent after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5 mt-12">
        
        {/* Phase label */}
        <div className="sm:absolute left-0 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-accent bg-accent/10">
          Phase {phase}
        </div>
        
        {/* Card */}
        <div className="border-gray-200 rounded-xl w-full ml-0 sm:ml-8 max-w-3xl">
          {/* Title */}
          <div className="mb-4 mt-1">
            <h3 className="text-xl font-bold text-dark">{title}</h3>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            {description}
          </p>
          
          <ul className="space-y-3">
            {deliverables.map((deliverable, index) => (
              <li 
                key={index}
                className="flex items-start space-x-3 text-gray-600"
              >
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimelineStep;