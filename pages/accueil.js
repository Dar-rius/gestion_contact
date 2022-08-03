import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';

const Index = ({ contacts }) => {
  return (
    <div className="notes-container">
      <h1>Les contacts</h1>
      <div className="grid wrapper">
        {contacts.map(contact => {
          return (
            <div key={contact._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${contact._id}`}>
                      <a>{contact.nom}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${contact._id}`}>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/${contact._id}/edit`}>
                    <Button primary>Editer</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          )
        })}

      </div>
        <Link href="http://localhost:3000/new" >
            <a style={{display:"flex", justifyContent:"center", marginTop:10}}>
              <Button primary>create</Button>
            </a>
        </Link>
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/contacts')
  const { data } = await res.json();

  return { contacts: data }
}

export default Index;