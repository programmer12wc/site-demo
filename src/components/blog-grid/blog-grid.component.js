import Image from "next/image";
import Link from "next/link";

const BlogGrid = ({ data }) => {
  // console.log(data);
  return (
    <div className="prod-grid ">
      <Link href={`blog/${data.character}`}>
        <img src={data.image} alt={data.alt} />
      </Link>
      <h3>{data.name} </h3>
      <p>{data.gameSeries} </p>
    </div>
  );
};

export default BlogGrid;
