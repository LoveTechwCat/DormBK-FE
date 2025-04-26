import { FC } from 'react';

type Primitive = string | number | boolean | null | undefined | unknown;
type PrimitiveValue =
  | Primitive
  | { [key: string]: PrimitiveValue }
  | PrimitiveValue[];

interface StatisticDataDisplayProps {
  data: PrimitiveValue | PrimitiveValue[];
  compact?: boolean;
}

const StatisticDataDisplay: FC<StatisticDataDisplayProps> = ({
  data,
  compact = false,
}) => {
  if (!data) return null;

  const isSingleKeyObject =
    typeof data === 'object' &&
    !Array.isArray(data) &&
    data !== null &&
    Object.keys(data).length === 1;

  const formatValue = (value: PrimitiveValue) => {
    if (typeof value === 'object' && value !== null) {
      return compact ? (
        '[Object]'
      ) : (
        <pre className='whitespace-pre-wrap'>
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }
    return String(value);
  };

  const renderSingleKey = (obj: Record<string, PrimitiveValue>) => {
    const [[key, value]] = Object.entries(obj);
    return (
      <div className='flex flex-col items-center justify-center gap-2 rounded-lg bg-blue-50 p-8 shadow'>
        <div className='text-5xl font-bold text-blue-700'>
          {formatValue(value)}
        </div>
        <div className='text-sm font-medium tracking-wider text-gray-600 uppercase'>
          {formatLabel(key)}
        </div>
      </div>
    );
  };

  const renderObject = (obj: Record<string, PrimitiveValue>) => (
    <table className='w-full text-left text-sm text-gray-700'>
      <tbody>
        {Object.entries(obj).map(([key, value]) => (
          <tr key={key} className='border-b'>
            <td className='py-2 font-semibold'>{key}</td>
            <td className='py-2'>{formatValue(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderArray = (arr: PrimitiveValue[]) => (
    <div className='flex flex-col gap-2'>
      {arr.map((item, index) => (
        <div key={index} className='rounded-lg border bg-gray-50 p-4'>
          {typeof item === 'object' && item !== null ? (
            renderObject(item as Record<string, PrimitiveValue>)
          ) : (
            <div>{formatValue(item)}</div>
          )}
        </div>
      ))}
    </div>
  );

  const formatLabel = (key: string) => {
    switch (key) {
      case 'totalDisciplinedStudents':
        return 'Total Disciplined Students';
      case 'totalStudents':
        return 'Total Students';
      case 'validDormCards':
        return 'Valid Dormitory Cards';
      default:
        return key.replace(/([A-Z])/g, ' $1').trim();
    }
  };

  return (
    <div className='mt-4'>
      {isSingleKeyObject
        ? renderSingleKey(data as Record<string, PrimitiveValue>)
        : Array.isArray(data)
          ? renderArray(data)
          : renderObject(data as Record<string, PrimitiveValue>)}
    </div>
  );
};

export default StatisticDataDisplay;
