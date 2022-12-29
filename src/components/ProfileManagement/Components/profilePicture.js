import dynamic from "next/dynamic";

export default function ProfilePictureComponent() {
  return (
    <>
     
      <div>
        <div className="row">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input type="file" accept="image/*"  />
            </label>
          </div>

          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              // disabled={!currentFile}
              // onClick={this.upload}
            >
              Upload
            </button>
          </div>
        </div>
    </div>
    </>
  );
}
