import {Button, Form, Input, Label, Search} from "./Searchbar.styled";
import { BsSearch } from 'react-icons/bs';

export default function Searchbar({ onSubmit }) {
  
  
  
  return (
    <Search>
      <Form onSubmit={onSubmit}>
        <Button type="submit">
          <BsSearch></BsSearch>
          <Label>Search</Label>
        </Button>

        <Input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Search>
  );
}
