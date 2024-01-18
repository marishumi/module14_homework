const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`; 


function transformXml(strXml) {

	
    const parser = new DOMParser();

	
	const xmlDOM = parser.parseFromString(strXml, "text/xml");
	
	
	const listNodes = xmlDOM.querySelector("list");
    const studentsNodes = listNodes.querySelectorAll("student");
	
	const result = {list: []};
	//const student = new Object();
 
	studentsNodes.forEach((element) => {
		const student = new Object();
	    const studentFirstName = element.querySelector("first");
		const studentSecondName = element.querySelector("second");
	    const studentAge = element.querySelector("age");
	    const studentProf = element.querySelector("prof");
	    const nameNode = element.querySelector("name");
	    const nameLang = nameNode.getAttribute("lang");
	    student.name = studentFirstName.textContent+ ' ' +studentSecondName.textContent; 
	    student.age = studentAge.textContent;
	    student.prof = studentProf.textContent;
	    student.lang = nameLang;
	
	    result.list.push(student);
	
    });
    console.log(result); 
}
transformXml(xmlString); 
