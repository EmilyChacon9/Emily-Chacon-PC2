function CreateCourse() {
  return (
    <>
    <div>CreateCourse</div>

    <form> 
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Code" />
        <input type="number" placeholder="Credits" />
        <input type="number" placeholder="Nota (0-20)" />
        <input type="text" placeholder="Badge" />
        <button type="submit">Create Course</button>
    </form>
    </>
  )
}

export default CreateCourse