import fitz # PyMuPDF
from io import BytesIO

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Given a raw byte stream from an uploaded PDF, securely parse every
    page natively and extract raw strings minimizing formatting artifacts.
    """
    extracted_text = []
    
    # Open the byte stream strictly as a PDF container
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text = page.get_text("text")
            extracted_text.append(text)
            
    # Compile multi-paged layouts cleanly separated logically
    return "\n\n".join(extracted_text)
