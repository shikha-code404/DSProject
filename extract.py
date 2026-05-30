import zipfile, xml.etree.ElementTree as ET
with zipfile.ZipFile(r'C:\Atharva\JSPM\DSProject\final_modules_prereq\quiz_questionnnaire.docx') as docx:
    tree = ET.fromstring(docx.read('word/document.xml'))
    text = '\n'.join(node.text for node in tree.iter() if node.tag.endswith('}t') and node.text)
    with open('quiz.txt', 'w', encoding='utf-8') as f:
        f.write(text)
