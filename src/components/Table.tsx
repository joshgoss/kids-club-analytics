import classNames from "classnames";

type Props = {
  className?: string;
  headers: string[];
  data: (string | number)[][];
  activeIndex: number;
  onRowClick?: Function;
  style?: object;
};

export default function Table({
  activeIndex,
  className,
  headers,
  data,
  onRowClick,
  style,
}: Props) {
  return (
    <table className={`table-auto ${className}`} style={style}>
      <thead>
        <tr className="bg-blue-500">
          {headers.map((h) => (
            <th key={h} className="border p-2 text-white font-normal">
              {h}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((d, i) => {
          const active = i === activeIndex;
          return (
            <tr
              key={i}
              className={classNames(
                "cursor-pointer",
                "border border-r-0 hover:bg-slate-200 cursor-pointer",
                {
                  "bg-slate-50 hover:bg-slate-100": i % 2 !== 0 && !active,
                  "border-t-0": i === 0,
                  "bg-yellow-100 hover:bg-yellow-100": active,
                }
              )}
              onClick={(e) => {
                e.preventDefault();
                onRowClick && onRowClick(d);
              }}
            >
              {d.map((v) => (
                <td key={v} className={classNames("border-r p-2", {})}>
                  {v}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
